import Link from 'next/link'
import React from 'react'

export const AppHeader = () => {
  return (
    <header className="bg-indigo-600 text-white h-12">
      <div className="max-w-3xl mx-auto px-5 h-full flex justify-between items-center">
        <h1 className="font-bold">
          <Link href="/">
            <a>User Matters</a>
          </Link>
        </h1>
        <div className="space-x-5">
          <Link href="/#pricing">
            <a>Pricing</a>
          </Link>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
