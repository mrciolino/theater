import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/theme-provider.tsx'
import CustomCursor from './components/custom-cursor'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CustomCursor />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
