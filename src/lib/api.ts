import { getSdk } from '$src/generated/graphql'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

export const gqlClient = new GraphQLClient(`/api/graphql`, {
  credentials: 'same-origin',
})

export const sdk = getSdk(gqlClient)

export const getProjects = () =>
  useQuery('projects', () => {
    return sdk.getProjects()
  })

export const getProject = (slug: string) =>
  useQuery(
    ['projects', { slug }],
    () =>
      sdk.getProjectBySlug({
        slug,
      }),
    {
      enabled: !!slug,
    },
  )

export const getFeedbacks = (projectSlug: string) =>
  useInfiniteQuery(
    ['feedbacks', { projectSlug }],
    ({ pageParam }) =>
      sdk.getFeedbacksByProjectSlug({
        projectSlug,
        after: pageParam,
      }),
    {
      enabled: !!projectSlug,
      getNextPageParam: (lastPage) => {
        if (!lastPage.feedbacks.hasMore) return null
        const last =
          lastPage.feedbacks.nodes[lastPage.feedbacks.nodes.length - 1]
        return last?.id
      },
    },
  )

export const useDeleteFeedbackMutation = () => {
  const client = useQueryClient()

  return useMutation(
    ({ slug }: { slug: string }) => sdk.deleteFeedback({ slug }),
    {
      onSuccess(data) {
        client.invalidateQueries('feedbacks')
      },
    },
  )
}

export const useCreateProjectMutation = () => {
  return useMutation((args: { name: string }) => sdk.createProject(args))
}

export const useUpdateProjectMutation = () => {
  const router = useRouter()
  return useMutation(sdk.updateProject, {
    onSuccess(data) {
      // Refetch page props
      router.replace(router.asPath)
    },
  })
}

export const useLoginMutation = () => useMutation(sdk.requestLoginLink)

export const useUpdateProfileMutation = () => useMutation(sdk.updateProfile)
