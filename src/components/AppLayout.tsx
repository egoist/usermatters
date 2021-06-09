import Head from 'next/head'
import React from 'react'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export const AppLayout: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - User Matters` : `User Matters`}</title>
      </Head>
      <AppHeader />
      <div className="max-w-3xl mx-auto px-5 my-8">{children}</div>
      <AppFooter />
    </>
  )
}
