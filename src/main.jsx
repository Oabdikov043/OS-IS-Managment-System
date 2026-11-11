
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import React from 'react'
import './styles/tailwind.css'

createRoot(document.getElementById('root')).render(
 

  <BrowserRouter>
   <App />
  </BrowserRouter>
    
 
)
