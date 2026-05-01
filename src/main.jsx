import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DisplayProdectProvider } from './context/SupbaseContext.jsx'
import { CartContextProvider } from './context/CartCotext.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests twice
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
  },
});

createRoot(document.getElementById('root')).render(
     <QueryClientProvider client={queryClient}>
          <DisplayProdectProvider>
               <CartContextProvider>
                    <App />
               </CartContextProvider>
          </DisplayProdectProvider>
     </QueryClientProvider>
)
