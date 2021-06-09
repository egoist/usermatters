import { GqlContext, Context } from '$server/decorators/gql-context'
import { requireAuth } from '$server/guards/require-auth'
import { timeago } from '$server/lib/date'
import { prisma } from '$server/lib/prisma'
import { parseUserAgent } from '$server/lib/ua'
import { ApolloError } from 'apollo-server-micro'
import { nanoid } from 'nanoid'
import geoip from 'geoip-lite'
import {
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import requestIp from 'request-ip'
import {
  CreateFeedbackArgs,
  DeleteFeedbackArgs,
  Feedback,
  FeedbacksArgs,
  FeedbacksConnection,
} from './feedback.type'
import { feedbackNotificationQueue } from '$server/lib/queue'

@Resolver((of) => Feedback)
export default class FeedbackResolver {
  @Query((returns) => FeedbacksConnection)
  async feedbacks(
    @GqlContext() ctx: Context,
    @Args() args: FeedbacksArgs,
  ): Promise<FeedbacksConnection> {
    const auth = requireAuth(ctx)
    const project = await prisma.project.findUnique({
      where: {
        slug: args.projectSlug,
      },
    })
    if (!project) throw new ApolloError(`project not found`)

    auth.canManageProject(project)

    const feedbacks = await prisma.feedback.findMany({
      where: {
        projectId: project.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: args.limit + 1,
      cursor: args.after
        ? {
            id: args.after,
          }
        : undefined,
    })

    return {
      nodes: feedbacks.slice(0, args.limit),
      hasMore: feedbacks.length > args.limit,
    }
  }

  @Mutation((returns) => Feedback)
  async createFeedback(
    @GqlContext() ctx: Context,
    @Args() args: CreateFeedbackArgs,
  ): Promise<Feedback> {
    const project = await prisma.project.findUnique({
      where: {
        slug: args.project,
      },
    })
    if (!project) {
      throw new ApolloError(`project not found`, `E_PROJECT_NOT_FOUND`)
    }
    const ua = parseUserAgent(ctx.req.headers['user-agent'] || '')
    const os = [ua.os.name, ua.os.version].filter(Boolean).join(' ')
    const browser = [ua.browser.name, ua.browser.version]
      .filter(Boolean)
      .join(' ')
    const ip = requestIp.getClientIp(ctx.req)
    const geo = ip ? geoip.lookup(ip) : undefined
    const feedback = await prisma.feedback.create({
      data: {
        project: {
          connect: {
            id: project.id,
          },
        },
        slug: nanoid(11),
        content: args.content,
        userEmail: args.userEmail,
        userName: args.userName || args.userEmail.split('@')[0],
        os,
        browser,
        country: geo?.country,
        timezone: geo?.timezone,
        reaction: args.reaction,
      },
    })
    if (project.notifyEmail) {
      feedbackNotificationQueue.add({ feedbackId: feedback.id })
    }
    return feedback
  }

  @Mutation((returns) => Boolean)
  async deleteFeedback(
    @GqlContext() ctx: Context,
    @Args() args: DeleteFeedbackArgs,
  ) {
    const auth = requireAuth(ctx)
    const feedback = await prisma.feedback.findUnique({
      where: {
        slug: args.slug,
      },
      include: {
        project: true,
      },
    })
    if (!feedback) throw new ApolloError(`project not found`)
    auth.canManageProject(feedback.project)
    await prisma.feedback.delete({
      where: {
        id: feedback.id,
      },
    })
    return true
  }

  @FieldResolver((returns) => String)
  formattedDate(@Root() feedback: Feedback) {
    return timeago(feedback.createdAt)
  }
}
