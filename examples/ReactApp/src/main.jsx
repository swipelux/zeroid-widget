import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ZeroIDProvider} from "./providers/ZeroIDProvider.jsx";

ReactDOM.createRoot(document.getElementById('rootElement')).render(
  <React.StrictMode>
      <ZeroIDProvider>
          <App />
      </ZeroIDProvider>
  </React.StrictMode>,
)
