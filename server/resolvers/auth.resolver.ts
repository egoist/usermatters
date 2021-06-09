import { Arg, Mutation, Resolver } from 'type-graphql'
import { generateLoginCode } from '$server/lib/auth'
import { Context, GqlContext } from '$server/decorators/gql-context'
import { loginEmailQueue } from '$server/lib/queue'

@Resolver()
export default class AuthResolver {
  @Mutation((returns) => Boolean)
  async requestLoginLink(
    @GqlContext() ctx: Context,
    @Arg('email') email: string,
  ) {
    const link = `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://usermatters.co'
    }/api/login?code=${generateLoginCode(email)}`
    console.log(link)

    loginEmailQueue.add({
      userAgent: ctx.req.headers['user-agent'] || '',
      email,
      link,
    })

    return true
  }
}
