// App.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner' // Toaster ni import qiling
import Home from './pages/Home'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Asosiy kontent */}
      <Home />
      
      {/* Toaster - DOM oxirida bo'lishi kerak */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        closeButton
        duration={4000}
      />
    </QueryClientProvider>
  )
}