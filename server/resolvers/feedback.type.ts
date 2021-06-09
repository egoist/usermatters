import { ArgsType, Field, ObjectType, Int, Args } from 'type-graphql'

@ArgsType()
export class CreateFeedbackArgs {
  @Field()
  project: string

  @Field()
  content: string

  @Field()
  userEmail: string

  @Field({ nullable: true })
  userName?: string

  @Field({ nullable: true })
  reaction?: string
}

@ObjectType()
export class Feedback {
  @Field((type) => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  slug: string

  @Field()
  content: string

  @Field()
  userEmail: string

  @Field((type) => String, { nullable: true })
  userName?: string | null

  @Field((type) => String, { nullable: true })
  reaction?: string | null
}

@ObjectType()
export class FeedbacksConnection {
  @Field((type) => [Feedback])
  nodes: Feedback[]

  @Field()
  hasMore: boolean
}

@ArgsType()
export class FeedbacksArgs {
  @Field()
  projectSlug: string

  @Field((type) => Int, { defaultValue: 20 })
  limit: number

  @Field((type) => Int, { nullable: true })
  after?: number
}

@ArgsType()
export class DeleteFeedbackArgs {
  @Field()
  slug: string
}
