import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { middie } from '$server/lib/middie'
import { UserWithMembers } from '$server/decorators/gql-context'
import { authMiddleware } from '$src/lib/middlewares'
import { DashboardLayout } from '$src/components/dash/DashboardLayout'
import { getProject } from '$src/lib/api'
import { ProjectHeader } from '$src/components/dash/ProjectHeader'
import { FeedbackPopup } from 'usermatters-react'
import { CodeBlock } from '$src/components/CodeBlock'
import { useTabs } from '$src/components/Tabs'
import clsx from 'clsx'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>().use(authMiddleware).run(ctx)
}

export default function ProjectSetupPage({ user }: Props) {
  const router = useRouter()
  const projectSlug = router.query.project as string

  const project = getProject(projectSlug)
  const projectName = project.data?.project.name

  const tabs = useTabs()

  const tabItems = [
    {
      title: 'html5',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32">
          <path
            fill="#e44f26"
            d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30L5.902 27.201z"
          ></path>
          <path
            fill="#f1662a"
            d="M16 27.858l8.17-2.265l1.922-21.532H16v23.797z"
          ></path>
          <path
            fill="#ebebeb"
            d="M16 13.407h-4.09l-.282-3.165H16V7.151H8.25l.074.83l.759 8.517H16v-3.091z"
          ></path>
          <path
            fill="#ebebeb"
            d="M16 21.434l-.014.004l-3.442-.929l-.22-2.465H9.221l.433 4.852l6.332 1.758l.014-.004v-3.216z"
          ></path>
          <path
            fill="#fff"
            d="M15.989 13.407v3.091h3.806l-.358 4.009l-3.448.93v3.216l6.337-1.757l.046-.522l.726-8.137l.076-.83H15.989z"
          ></path>
          <path
            fill="#fff"
            d="M15.989 7.151V10.242h7.466l.062-.694l.141-1.567l.074-.83h-7.743z"
          ></path>
        </svg>
      ),
    },
    {
      title: 'react',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32">
          <circle cx="16" cy="15.974" r="2.5" fill="#00d8ff"></circle>
          <path
            d="M16 21.706a28.385 28.385 0 0 1-8.88-1.2a11.3 11.3 0 0 1-3.657-1.958A3.543 3.543 0 0 1 2 15.974c0-1.653 1.816-3.273 4.858-4.333A28.755 28.755 0 0 1 16 10.293a28.674 28.674 0 0 1 9.022 1.324a11.376 11.376 0 0 1 3.538 1.866A3.391 3.391 0 0 1 30 15.974c0 1.718-2.03 3.459-5.3 4.541a28.8 28.8 0 0 1-8.7 1.191zm0-10.217a27.948 27.948 0 0 0-8.749 1.282c-2.8.977-4.055 2.313-4.055 3.2c0 .928 1.349 2.387 4.311 3.4A27.21 27.21 0 0 0 16 20.51a27.6 27.6 0 0 0 8.325-1.13C27.4 18.361 28.8 16.9 28.8 15.974a2.327 2.327 0 0 0-1.01-1.573a10.194 10.194 0 0 0-3.161-1.654A27.462 27.462 0 0 0 16 11.489z"
            fill="#00d8ff"
          ></path>
          <path
            d="M10.32 28.443a2.639 2.639 0 0 1-1.336-.328c-1.432-.826-1.928-3.208-1.327-6.373a28.755 28.755 0 0 1 3.4-8.593a28.676 28.676 0 0 1 5.653-7.154a11.376 11.376 0 0 1 3.384-2.133a3.391 3.391 0 0 1 2.878 0c1.489.858 1.982 3.486 1.287 6.859a28.806 28.806 0 0 1-3.316 8.133a28.385 28.385 0 0 1-5.476 7.093a11.3 11.3 0 0 1-3.523 2.189a4.926 4.926 0 0 1-1.624.307zm1.773-14.7a27.948 27.948 0 0 0-3.26 8.219c-.553 2.915-.022 4.668.75 5.114c.8.463 2.742.024 5.1-2.036a27.209 27.209 0 0 0 5.227-6.79a27.6 27.6 0 0 0 3.181-7.776c.654-3.175.089-5.119-.713-5.581a2.327 2.327 0 0 0-1.868.089A10.194 10.194 0 0 0 17.5 6.9a27.464 27.464 0 0 0-5.4 6.849z"
            fill="#00d8ff"
          ></path>
          <path
            d="M21.677 28.456c-1.355 0-3.076-.82-4.868-2.361a28.756 28.756 0 0 1-5.747-7.237a28.676 28.676 0 0 1-3.374-8.471a11.376 11.376 0 0 1-.158-4A3.391 3.391 0 0 1 8.964 3.9c1.487-.861 4.01.024 6.585 2.31a28.8 28.8 0 0 1 5.39 6.934a28.384 28.384 0 0 1 3.41 8.287a11.3 11.3 0 0 1 .137 4.146a3.543 3.543 0 0 1-1.494 2.555a2.59 2.59 0 0 1-1.315.324zm-9.58-10.2a27.949 27.949 0 0 0 5.492 6.929c2.249 1.935 4.033 2.351 4.8 1.9c.8-.465 1.39-2.363.782-5.434A27.212 27.212 0 0 0 19.9 13.74a27.6 27.6 0 0 0-5.145-6.64c-2.424-2.152-4.39-2.633-5.191-2.169a2.327 2.327 0 0 0-.855 1.662a10.194 10.194 0 0 0 .153 3.565a27.465 27.465 0 0 0 3.236 8.1z"
            fill="#00d8ff"
          ></path>
        </svg>
      ),
    },
    {
      title: 'vue',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32">
          <path
            d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6l3.22-5.6z"
            fill="#41b883"
          ></path>
          <path
            d="M2 3.925l14 24.15l14-24.15h-5.6L16 18.415L7.53 3.925z"
            fill="#41b883"
          ></path>
          <path
            d="M7.53 3.925L16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6z"
            fill="#35495e"
          ></path>
        </svg>
      ),
    },
  ]

  const propsDocs = (
    <>
      <p>Component props:</p>
      <ul>
        <li>
          <code>project</code>: <strong>Required</strong> The project ID, which
          is <code>{projectSlug}</code> for this project.
        </li>
        <li>
          <code>user</code>: <strong>Optional</strong> The email of the user who
          is submitting the feedback. You can also optionally add a user name
          which is solely for display purpose in front of the email. If you
          don't set this prop, user will be able to fill in their name and email
          address in the triggered popup.
        </li>
      </ul>
    </>
  )

  return (
    <DashboardLayout title={projectName && `${projectName}`}>
      {project && <ProjectHeader projectSlug={projectSlug} user={user} />}

      <h2 className="text-3xl font-bold border-b pb-3 mb-5">Setup</h2>

      <div className="flex mb-5 space-x-1">
        {tabItems.map((item, index) => {
          return (
            <button
              key={item.title}
              title={item.title}
              onClick={() => tabs.setIndex(index)}
              className={clsx(
                `rounded-lg px-3 h-10 flex items-center justify-center focus:outline-none`,
                tabs.isActive(index)
                  ? `bg-gray-300 text-white`
                  : `hover:bg-gray-100`,
              )}
            >
              {item.icon}
            </button>
          )
        })}
      </div>

      <tabs.Tab index={0}>
        <div className="prose">
          <p>
            If you want to collect feedbacks in an app without client-side
            routing, e.g. in a Laravel, Rails or Go web app, you can load the JS
            widget via <code>{`<script>`}</code> tag.
          </p>
          <h4>1. Add the JS widget</h4>
          <p>
            Add following code to the end of your HTML<code>{`<body>`}</code>{' '}
            tag:
          </p>
          <CodeBlock
            code={`<script async defer src="https://cdn.usermatters.co/widget.js"></script>`}
            lang="markup"
          />
          <h4>2. Configure the button</h4>
          <CodeBlock
            code={`<button
  data-usermatters-project="${projectSlug}"
  data-usermatters-user="NAME user@example.com">
  Feedback
</button>`}
            lang="markup"
          />
          <ul>
            <li>
              <code>data-usermatters-project</code> is a required attribute,
              whose value should be the project id <code>{projectSlug}</code>.
              Any button with this attribute will trigger the feedback popup.
            </li>
            <li>
              <code>data-usermatters-user</code> is an optional attribute, whose
              value should be the email address of the user that is submitting
              the feedback. You can also optionally add the user name which is
              solely for display purpose in front of the email. If you don't
              prefill this attribute, user will be able to fill in their name
              and email address in the triggered popup. Check the previews
              below.
            </li>
          </ul>
        </div>
      </tabs.Tab>

      <tabs.Tab index={1}>
        <div className="prose">
          <p>Install the React component:</p>
          <CodeBlock code={`npm i usermatters-react`} lang="bash" />
          <p>
            Use the <code>{`<FeedbackPopup>`}</code> component in your code:
          </p>
          <CodeBlock
            code={`import { FeedbackPopup } from 'usermatters-react'
        
const App = () => {
  return <FeedbackPopup project="${projectSlug}">
  {({ handleClick }) => {
    return <button onClick={handleClick}>Feedback</button>
  }}
  </FeedbackPopup>
}        `}
            lang={'tsx'}
          />
          {propsDocs}
        </div>
      </tabs.Tab>

      <tabs.Tab index={2}>
        <div className="prose">
          <p>Install the Vue component:</p>
          <CodeBlock code={`npm i usermatters-vue`} lang="bash" />
          <p>
            Use the <code>{`<FeedbackPopup>`}</code> component in your code:
          </p>
          <CodeBlock
            code={`<script setup>
import { FeedbackPopup } from 'usermatters-vue'
</script>

<template>
  <FeedbackPopup project="${projectSlug}" v-slot="{ handleClick }">
    <button @click="handleClick">Feedback</button>
  </FeedbackPopup>
</template>`}
            lang={'markup'}
          />
          {propsDocs}
        </div>
      </tabs.Tab>

      <h2 className="border-b pb-3 mb-5 mt-12 text-3xl font-bold">Preview</h2>
      <div className="space-x-2">
        <FeedbackPopup project={projectSlug} api="/api/graphql">
          {({ handleClick }) => (
            <button
              onClick={handleClick}
              className="border bg-white shadow text-sm rounded-lg px-2 py-1 hover:bg-gray-100"
            >
              💬 Without prefilling user
            </button>
          )}
        </FeedbackPopup>
        <FeedbackPopup
          project={projectSlug}
          user={`${user.name} ${user.email}`}
          api="/api/graphql"
        >
          {({ handleClick }) => (
            <button
              onClick={handleClick}
              className="border bg-white shadow text-sm rounded-lg px-2 py-1 hover:bg-gray-100"
            >
              💬 Prefilled user
            </button>
          )}
        </FeedbackPopup>
      </div>
    </DashboardLayout>
  )
}
