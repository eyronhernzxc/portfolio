import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.tsx'
import { Analytics } from "@vercel/analytics/react"
import Noise from "@/components/bg/noise";

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <App />

  <Analytics />
  </StrictMode>,
)
