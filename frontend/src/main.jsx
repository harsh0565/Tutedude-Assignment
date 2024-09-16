import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './components/context/Auth.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
