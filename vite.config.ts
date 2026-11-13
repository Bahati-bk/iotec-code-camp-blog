import path from "path"
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },

    server: {
        proxy: {
            '/hashnode-api': {
                target: 'https://godfident-data.hashnode.dev',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/hashnode-api/, ''),
            },
        },
    },
})
