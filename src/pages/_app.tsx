import '../css/tailwind.css'
import '../css/app.css'
import '../css/prose.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.browser && process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}

const App = ({ Component, pageProps }: any) => {
  const queryClient = React.useMemo(() => new QueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
