import { AuthenticationError, ApolloError } from 'apollo-server-micro'
import { Context } from '$server/decorators/gql-context'
import { Project, Feedback } from '@prisma/client'

export function requireAuth(context: Context) {
  if (!context.user) {
    throw new AuthenticationError(`Unauthenticated`)
  }

  const { user } = context

  const isMemberOfProject = (projectId: number) => {
    return user.members.some((m) => m.projectId === projectId)
  }

  return {
    user,
    canManageProject(project: Project) {
      const isMember = isMemberOfProject(project.id)
      if (!isMember) {
        throw new ApolloError(`You're not a member of this project`)
      }
    },
  }
}

const ADMIN_IDS = [1]
export function requireAdmin(user: { id: number }) {
  if (!ADMIN_IDS.includes(user.id)) {
    throw new ApolloError(`Require admin permission`)
  }
}

export function isAdmin(user: { id: number }) {
  return ADMIN_IDS.includes(user.id)
}
