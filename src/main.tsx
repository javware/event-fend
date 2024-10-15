import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
  </QueryClientProvider>

</React.StrictMode>
)
