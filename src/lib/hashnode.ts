// src/lib/hashnode.ts
import { XMLParser } from "fast-xml-parser";

//const RSS_URL = "https://godfident-data.hashnode.dev/rss.xml";

// Helper to unwrap CDATA sections in RSS text fields
function unwrap(value: any): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value.__cdata ?? String(value);
}

// Helper to estimate read time from HTML content
function estimateReadTime(html: string, wpm = 200): number {
  const words = html
    .replace(/<[^>]*>/g, " ") // strip HTML tags
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

// Helper to extract the first image URL from the HTML content
function extractFirstImage(html: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
}

// Helper to format date nicely (e.g., "Oct 12, 2026")
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const getPosts = async (): Promise<any[]> => {
  // Use the Vite proxy to avoid CORS issues
  const res = await fetch(`/hashnode-api/rss.xml`, { cache: "no-store" });
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: "__cdata", // This tells the parser how to handle <![CDATA[ ]]>
    isArray: (tagName) => tagName === "item" || tagName === "category", // Force these to be arrays
  });

  const jsonObj = parser.parse(xml);
  const items = jsonObj?.rss?.channel?.item ?? [];

  return items.map((item: any) => {
    const html = unwrap(item["content:encoded"]);
    
    // Extract the link and get the slug (the part after the final slash)
    const link = unwrap(item.link);
    const slug = link.substring(link.lastIndexOf("/") + 1);

    return {
      id: slug, // Using slug as the ID
      title: unwrap(item.title),
      slug: slug,
      publishedAt: formatDate(unwrap(item.pubDate)),
      brief: unwrap(item.description),
      // Try to get image from the HTML, otherwise use a placeholder
      coverImage: extractFirstImage(html) || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      tags: (item.category ?? []).map(unwrap),
      html: html,
      readTimeInMinutes: estimateReadTime(html),
    };
  });
};