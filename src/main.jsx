import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')).render(
  <App />
)

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log('Tu app está lista para usarse offline 🚀')
  },
})