import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'typeface-poppins';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/Authcontext";
import { ThemeProvider } from "./context/Isdarkmode";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
