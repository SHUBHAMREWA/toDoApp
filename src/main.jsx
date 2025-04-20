import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import '@fontsource/roboto' // 👈 Roboto font
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline/>
    <App />
  </StrictMode>,
)
