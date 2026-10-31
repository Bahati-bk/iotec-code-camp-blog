import { RouterProvider } from './navigation/RouterContext'
import { AppRouter } from './navigation/routes'

function App() {
  return (
    <RouterProvider>
      <AppRouter />
    </RouterProvider>
  )
}

export default App
