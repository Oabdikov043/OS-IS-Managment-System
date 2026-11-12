
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import React from 'react'
import './styles/tailwind.css'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
 

  <BrowserRouter>
  <AuthProvider>
   <App />
  </AuthProvider>
  </BrowserRouter>
    
 
)
