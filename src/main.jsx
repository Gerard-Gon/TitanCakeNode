import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/templates/global.css';
import './styles/organisms/navbar.css'

createRoot(document.getElementById('root')).render(
 <StrictMode>
   <BrowserRouter>
     <AuthProvider> 
       <App />
     </AuthProvider>
   </BrowserRouter>
 </StrictMode>,
)