import React from 'react'
import Head from 'next/head'
import { DashboardHeader } from './DashboardHeader'
import { useBodyClass } from '$src/hooks/useBodyClass'

export const DashboardLayout: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  useBodyClass('bg-dashboard')

  return (
    <>
      <Head>
        <title>{title && `${title} - User Matters`}</title>
      </Head>
      <DashboardHeader />
      <div className="max-w-3xl mx-auto px-5 my-8">{children}</div>
    </>
  )
}
