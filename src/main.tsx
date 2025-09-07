import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Относительный путь без расширения

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)