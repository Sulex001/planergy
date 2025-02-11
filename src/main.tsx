import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider  client={new QueryClient()}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
