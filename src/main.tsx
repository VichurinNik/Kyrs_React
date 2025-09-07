import React from 'react'
import ReactDOM from 'react-dom/client'
import MainTitle from './MainTitle.tsx' // Импортируем новый компонент

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainTitle /> {/* Используем новый компонент */}
  </React.StrictMode>,
)