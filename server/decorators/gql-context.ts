import { User, ProjectMember, Project } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { createParamDecorator } from 'type-graphql'

export type UserWithMembers = User & {
  members: (ProjectMember & { project: Project })[]
}

export type Context = {
  req: NextApiRequest
  res: NextApiResponse
  user?: UserWithMembers | null
}

export function GqlContext() {
  return createParamDecorator<Context>(({ context }) => context)
}
