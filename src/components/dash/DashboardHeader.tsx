import React from 'react'
import Link from 'next/link'
import { useClickOutside } from '$src/hooks/useClickOutside'

const AccountButton = () => {
  const [show, setShow] = React.useState(false)
  const items = [
    {
      text: 'New Project',
      link: '/projects/new',
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      ),
    },
    {
      text: 'Settings',
      link: '/account/settings',
    },
    {
      text: 'Log out',
      link: '/api/logout',
    },
  ]
  const dropdownRef = useClickOutside(() => setShow(false))
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setShow(!show)
        }}
        className="flex items-center space-x-1 focus:outline-none"
      >
        <span>Account</span>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {show && (
        <div
          ref={dropdownRef}
          className="absolute text-gray-600 w-52 bg-white rounded-lg top-11 right-0 shadow-lg overflow-hidden"
        >
          {items.map((item) => {
            return (
              <Link href={item.link} key={item.link}>
                <a className="flex px-3 h-10 items-center justify-between hover:bg-gray-100 hover:text-gray-900">
                  <span>{item.text}</span>
                  {item.icon && <span>{item.icon}</span>}
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const DashboardHeader = () => {
  return (
    <header className="bg-indigo-600 text-white h-12">
      <div className="max-w-3xl mx-auto px-5 h-full flex justify-between items-center">
        <h1 className="font-bold">
          <Link href="/projects">
            <a>User Matters</a>
          </Link>
        </h1>
        <div>
          <AccountButton />
        </div>
      </div>
    </header>
  )
}
