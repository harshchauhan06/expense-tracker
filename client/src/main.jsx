import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,

    style: {
      background: "#1F2937",
      color: "#fff",
      borderRadius: "14px",
      padding: "14px 18px",
      fontSize: "15px",
      fontWeight: "500",
      boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    },

    success: {
      iconTheme: {
        primary: "#22C55E",
        secondary: "#fff",
      },
    },

    error: {
      iconTheme: {
        primary: "#EF4444",
        secondary: "#fff",
      },
    },
  }}
/>
  </StrictMode>,
)
