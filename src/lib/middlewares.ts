/**
 * middlewares for next.js getServerSideProps
 */

import { UserWithMembers } from '$server/decorators/gql-context'
import { getCurrentUser } from '$server/lib/auth'
import { WareContext } from '$server/lib/middie'

export const authMiddleware = async (
  ctx: WareContext<{ user: UserWithMembers }>,
) => {
  const user = await getCurrentUser(ctx.req)
  if (!user) {
    return ctx.redirect('/login')
  }
  ctx.setProp('user', user)
}

export const latestProjectMiddleware = async (
  ctx: WareContext<{ user: UserWithMembers }>,
) => {
  const user = ctx.getProp('user')
  const projects = user.members
    .map((m) => m.project)
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
  const latest = projects[0]
  if (!latest) {
    return ctx.redirect(`/projects/new`)
  }
  return ctx.redirect(`/projects/${latest.slug}`)
}
