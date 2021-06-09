import { Context, GqlContext } from '$server/decorators/gql-context'
import { requireAuth } from '$server/guards/require-auth'
import { prisma } from '$server/lib/prisma'
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { nanoid } from 'nanoid'
import { Project, CreateProjectArgs, UpdateProjectArgs } from './project.type'
import { ApolloError } from 'apollo-server-micro'

@Resolver()
export default class ProjectResolver {
  @Query((returns) => [Project])
  async projects(@GqlContext() ctx: Context): Promise<Project[]> {
    const { user } = requireAuth(ctx)
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return projects
  }

  @Query((returns) => Project)
  async project(
    @GqlContext() ctx: Context,
    @Arg('slug') slug: string,
  ): Promise<Project> {
    const auth = requireAuth(ctx)
    const project = await prisma.project.findUnique({ where: { slug } })
    if (!project) throw new ApolloError(`project not found`)

    auth.canManageProject(project)

    return project
  }

  @Mutation((returns) => Project)
  async createProject(
    @GqlContext() ctx: Context,
    @Args() args: CreateProjectArgs,
  ): Promise<Project> {
    const { user } = requireAuth(ctx)
    const project = await prisma.project.create({
      data: {
        slug: nanoid(11),
        name: args.name,
        allowedDomains: args.allowedDomains,
        notifyEmail: user.email,
        members: {
          create: {
            role: 'owner',
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    })
    return project
  }

  @Mutation((returns) => Project)
  async updateProject(
    @GqlContext() ctx: Context,
    @Args() args: UpdateProjectArgs,
  ): Promise<Project> {
    const auth = requireAuth(ctx)
    const project = await prisma.project.findUnique({
      where: {
        slug: args.projectSlug,
      },
    })
    if (!project) throw new ApolloError(`project not found`)

    auth.canManageProject(project)

    const updatedProject = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: args.name,
        allowedDomains: args.allowedDomains,
        notifyEmail: args.notifyEmail,
      },
    })

    return updatedProject
  }
}
