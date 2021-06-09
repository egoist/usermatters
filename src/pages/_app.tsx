import '../css/tailwind.css'
import '../css/app.css'
import '../css/prose.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = ({ Component, pageProps }: any) => {
  const queryClient = React.useMemo(() => new QueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
