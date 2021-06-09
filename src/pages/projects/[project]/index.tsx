import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { middie } from '$server/lib/middie'
import { UserWithMembers } from '$server/decorators/gql-context'
import { authMiddleware } from '$src/lib/middlewares'
import { DashboardLayout } from '$src/components/dash/DashboardLayout'
import { Avatar } from '$src/components/Avatar'
import { Button } from '$src/components/Button'
import {
  useDeleteFeedbackMutation,
  getFeedbacks,
  getProject,
} from '$src/lib/api'
import { Spinner } from '$src/components/Spinner'
import { ProjectHeader } from '$src/components/dash/ProjectHeader'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>().use(authMiddleware).run(ctx)
}

const getEmoji = (type: string): string | undefined => {
  const map: Record<string, string> = {
    very_good: '🤩',
    good: '😄',
    bad: '😕',
    very_bad: '😭',
  }
  return map[type]
}

export default function ProjectPage({ user }: Props) {
  const router = useRouter()
  const projectSlug = router.query.project as string

  const project = getProject(projectSlug)
  const feedbacks = getFeedbacks(projectSlug)
  const deleteFeedback = useDeleteFeedbackMutation()

  const isEmpty = feedbacks.data?.pages[0].feedbacks.nodes.length === 0

  return (
    <DashboardLayout title={project.data?.project.name}>
      {project && <ProjectHeader projectSlug={projectSlug} user={user} />}
      {isEmpty && (
        <div className="py-10 text-center uppercase font-semibold text-lg bg-gray-200 rounded-lg">
          <div>No feedbacks yet.</div>
          <div className="mt-2">
            ⚡️{' '}
            <Link href={`/projects/${projectSlug}/setup`}>
              <a className="text-indigo-500 underline">Quick setup.</a>
            </Link>
          </div>
        </div>
      )}
      {feedbacks.data?.pages.map((group, i) => {
        return (
          <div key={i}>
            {group.feedbacks.nodes.map((feedback) => {
              return (
                <div
                  className="bg-white rounded-lg border p-5 flex space-x-4 mb-2"
                  key={feedback.id}
                >
                  <div>
                    <Avatar
                      name={feedback.userName}
                      email={feedback.userEmail}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex justify-between items-center">
                      <span className="font-bold space-x-1">
                        {feedback.reaction && (
                          <span>{getEmoji(feedback.reaction)}</span>
                        )}
                        <span>{feedback.userName}</span>
                        <span className="font-normal text-xs text-gray-500">
                          ({feedback.userEmail})
                        </span>
                      </span>
                      <span
                        className="text-gray-500 text-xs"
                        title={new Date(feedback.createdAt).toLocaleString()}
                      >
                        {feedback.formattedDate}
                      </span>
                    </div>
                    <div>{feedback.content}</div>
                    <div className="mt-5">
                      <button
                        className="text-red-500 text-xs focus:outline-none px-2 h-6 bg-red-50 hover:bg-red-100 hover:text-red-600 focus:bg-red-100 rounded-lg inline-flex items-center space-x-1"
                        onClick={() =>
                          confirm(`Are you sure you want to delete it?`) &&
                          deleteFeedback.mutate({ slug: feedback.slug })
                        }
                      >
                        {deleteFeedback.isLoading &&
                        deleteFeedback.variables?.slug === feedback.slug ? (
                          <Spinner />
                        ) : (
                          <svg
                            width="1.2em"
                            height="1.2em"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
      {feedbacks.hasNextPage && (
        <div className="mt-5">
          <Button
            variant="primary"
            className="w-full"
            isLoading={feedbacks.isFetchingNextPage}
            onClick={() => {
              feedbacks.fetchNextPage()
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </DashboardLayout>
  )
}
