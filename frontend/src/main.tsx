import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PortalGateApp } from './PortalGateApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortalGateApp />
  </StrictMode>,
)
