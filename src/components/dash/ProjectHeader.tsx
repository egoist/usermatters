import { UserWithMembers } from '$server/decorators/gql-context'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ProjectSwitcher } from './ProjectSwitcher'

export const ProjectHeader: React.FC<{
  projectSlug: string
  user: UserWithMembers
}> = ({ projectSlug, user }) => {
  const router = useRouter()
  const settingsPageLink = `/projects/${projectSlug}/settings`
  const isSettingsPageLinkActive = settingsPageLink === router.asPath

  const navLinks = [
    {
      title: 'Project Setup',
      link: `/projects/${projectSlug}/setup`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: 'Project Settings',
      link: `/projects/${projectSlug}/settings`,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20">
          <g fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 0 1-2.286.948c-1.372-.836-2.942.734-2.106 2.106c.54.886.061 2.042-.947 2.287c-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 0 1 .947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 0 1 2.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 0 1 2.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 0 1 .947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 0 1-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 0 1-2.287-.947zM10 13a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      ),
    },
  ]

  return (
    <div className="flex justify-between items-center mb-6 leading-none">
      <div>
        <ProjectSwitcher
          activeSlug={projectSlug}
          items={user.members
            .map((m) => m.project)
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))}
        />
      </div>
      <div className="flex space-x-1 items-center" style={{ marginTop: '1px' }}>
        {navLinks.map((item) => {
          return (
            <Link key={item.link} href={item.link}>
              <a
                title={item.title}
                className={clsx(
                  `mt-2 p-2 rounded-lg flex hover:bg-gray-200 hover:text-black`,
                  item.link === router.asPath
                    ? `bg-gray-200 text-indigo-500`
                    : `text-gray-500`,
                )}
              >
                {item.icon}
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
