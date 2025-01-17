import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes,Route} from "react-router"
import App from './App.jsx'
import { CommunityProvider } from './context/community.context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <CommunityProvider>
  <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
    </CommunityProvider>
  </BrowserRouter>
  </StrictMode>,
)
