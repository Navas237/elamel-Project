import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DisplayProdectProvider } from './context/SupbaseContext.jsx'
import { CartContextProvider } from './context/CartCotext.jsx'


createRoot(document.getElementById('root')).render(

     <DisplayProdectProvider>
          <CartContextProvider>

               <App />
          </CartContextProvider>

     </DisplayProdectProvider>
)
