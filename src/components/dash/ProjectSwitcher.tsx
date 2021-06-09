import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useClickOutside } from '$src/hooks/useClickOutside'

type Item = {
  name: string
  slug: string
}

export const ProjectSwitcher: React.FC<{ items: Item[]; activeSlug: string }> =
  ({ items, activeSlug }) => {
    const [show, setShow] = React.useState(false)
    const active = items.find((item) => item.slug === activeSlug)
    const dropdownRef = useClickOutside(() => setShow(false))

    React.useEffect(() => {
      setShow(false)
    }, [activeSlug])

    return (
      <div className="relative">
        <div className="flex space-x-3 group">
          <h2 className="text-3xl font-bold">
            <Link href={`/projects/${activeSlug}`}>
              <a>{active?.name}</a>
            </Link>
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShow(!show)
            }}
            className={clsx(
              `text-gray-500 border border-transparent transition-colors duration-250 hover:border-gray-300 group-hover:border-gray-300 p-2 py-1 rounded-lg hover:bg-gray-50 focus:outline-none focus:text-black`,
              show && `border-gray-300 bg-gray-50`,
            )}
          >
            <svg
              viewBox="0 0 16 24"
              height="16"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
            >
              <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
            </svg>
          </button>
        </div>
        {show && (
          <div
            ref={dropdownRef}
            className="absolute bg-white rounded-lg shadow-lg w-56 top-11 overflow-hidden"
          >
            {items.map((item) => {
              return (
                <Link href={`/projects/${item.slug}`} key={item.slug}>
                  <a className="flex px-3 h-10 items-center space-x-1 hover:bg-gray-100">
                    <span>{item.name}</span>
                    {item.slug === activeSlug && (
                      <span className="text-green-600">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </a>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }
