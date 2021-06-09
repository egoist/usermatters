import { ArgsType, Field, ObjectType, Int } from 'type-graphql'

@ArgsType()
export class CreateProjectArgs {
  @Field()
  name: string

  @Field((type) => String, { nullable: true })
  allowedDomains?: string
}

@ObjectType()
export class Project {
  @Field((type) => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  name: string

  @Field()
  slug: string

  @Field((type) => String, { nullable: true })
  allowedDomains?: string | null

  @Field((type) => String, { nullable: true })
  notifyEmail?: string | null
}

@ArgsType()
export class UpdateProjectArgs {
  @Field()
  projectSlug: string

  @Field({ nullable: true })
  name?: string

  @Field((type) => String, { nullable: true })
  allowedDomains?: string

  @Field({ nullable: true })
  notifyEmail?: string
}
