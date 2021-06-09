import { ArgsType, Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class CurrentUser {
  @Field((type) => Int)
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ArgsType()
export class UpdateProfileArgs {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string
}
