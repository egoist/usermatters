import '../css/tailwind.css'
import '../css/app.css'
import '../css/prose.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'

const useProgress = () => {
  if (!process.browser) return

  const ProgressBar: typeof import('@badrap/bar-of-progress') = require('@badrap/bar-of-progress')
  const bar = React.useMemo(() => new ProgressBar.default(), [])

  const router = useRouter()

  React.useEffect(() => {
    const handleEnter = () => {
      bar.start()
    }

    const handleLeave = () => {
      bar.finish()
    }

    router.events.on('routeChangeStart', handleEnter)
    router.events.on('routeChangeComplete', handleLeave)
    router.events.on('routeChangeError', handleLeave)

    return () => {
      router.events.off('routeChangeStart', handleEnter)
      router.events.off('routeChangeComplete', handleLeave)
      router.events.off('routeChangeError', handleLeave)
    }
  }, [])
}

const App = ({ Component, pageProps }: any) => {
  const queryClient = React.useMemo(() => new QueryClient(), [])
  useProgress()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
