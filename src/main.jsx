
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import React from 'react'
import './styles/tailwind.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {CartProvider} from './contexts/CartContext.jsx'

createRoot(document.getElementById('root')).render(
 

  <BrowserRouter>
  <AuthProvider>
   <CartProvider>
    <App />
   </CartProvider>
  </AuthProvider>
  </BrowserRouter>
    
 
)
