import { Args, Mutation, Query, Resolver } from 'type-graphql'
import { GqlContext } from '$server/decorators/gql-context'
import type { Context } from '$server/decorators/gql-context'
import { requireAuth } from '$server/guards/require-auth'
import { prisma } from '$server/lib/prisma'
import { CurrentUser, UpdateProfileArgs } from './current-user.type'

@Resolver((of) => CurrentUser)
export default class CurrentUserResolver {
  @Query((returns) => CurrentUser)
  async currentUser(@GqlContext() ctx: Context) {
    const auth = requireAuth(ctx)
    return auth.user
  }

  @Mutation((returns) => CurrentUser)
  async updateProfile(
    @GqlContext() ctx: Context,
    @Args() args: UpdateProfileArgs,
  ) {
    const auth = requireAuth(ctx)
    const updated = await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data: {
        name: args.name,
      },
    })
    return updated
  }
}
