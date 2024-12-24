import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { LanguageContextProvider } from "./contexts/LanguageContext"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"
import "./i18next"
import "./normalize.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <LanguageContextProvider>
          <ScrollToTop />
          <App />
        </LanguageContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
