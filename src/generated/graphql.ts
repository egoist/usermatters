import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type CurrentUser = {
  __typename?: 'CurrentUser'
  id: Scalars['Int']
  email: Scalars['String']
  name: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Feedback = {
  __typename?: 'Feedback'
  id: Scalars['Int']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  slug: Scalars['String']
  content: Scalars['String']
  userEmail: Scalars['String']
  userName?: Maybe<Scalars['String']>
  reaction?: Maybe<Scalars['String']>
  formattedDate: Scalars['String']
}

export type FeedbacksConnection = {
  __typename?: 'FeedbacksConnection'
  nodes: Array<Feedback>
  hasMore: Scalars['Boolean']
}

export type Mutation = {
  __typename?: 'Mutation'
  requestLoginLink: Scalars['Boolean']
  updateProfile: CurrentUser
  createFeedback: Feedback
  deleteFeedback: Scalars['Boolean']
  createProject: Project
  updateProject: Project
}

export type MutationRequestLoginLinkArgs = {
  email: Scalars['String']
}

export type MutationUpdateProfileArgs = {
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type MutationCreateFeedbackArgs = {
  project: Scalars['String']
  content: Scalars['String']
  userEmail: Scalars['String']
  userName?: Maybe<Scalars['String']>
  reaction?: Maybe<Scalars['String']>
}

export type MutationDeleteFeedbackArgs = {
  slug: Scalars['String']
}

export type MutationCreateProjectArgs = {
  name: Scalars['String']
  allowedDomains?: Maybe<Scalars['String']>
}

export type MutationUpdateProjectArgs = {
  projectSlug: Scalars['String']
  name?: Maybe<Scalars['String']>
  allowedDomains?: Maybe<Scalars['String']>
  notifyEmail?: Maybe<Scalars['String']>
}

export type Project = {
  __typename?: 'Project'
  id: Scalars['Int']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  slug: Scalars['String']
  allowedDomains?: Maybe<Scalars['String']>
  notifyEmail?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  currentUser: CurrentUser
  feedbacks: FeedbacksConnection
  projects: Array<Project>
  project: Project
}

export type QueryFeedbacksArgs = {
  projectSlug: Scalars['String']
  limit?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['Int']>
}

export type QueryProjectArgs = {
  slug: Scalars['String']
}

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']
}>

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'Project' } & Pick<Project, 'id' | 'slug'>
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'CurrentUser' } & Pick<
    CurrentUser,
    'id' | 'email' | 'name'
  >
}

export type DeleteFeedbackMutationVariables = Exact<{
  slug: Scalars['String']
}>

export type DeleteFeedbackMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteFeedback'
>

export type GetFeedbacksByProjectSlugQueryVariables = Exact<{
  projectSlug: Scalars['String']
  after?: Maybe<Scalars['Int']>
}>

export type GetFeedbacksByProjectSlugQuery = { __typename?: 'Query' } & {
  feedbacks: { __typename?: 'FeedbacksConnection' } & Pick<
    FeedbacksConnection,
    'hasMore'
  > & {
      nodes: Array<
        { __typename?: 'Feedback' } & Pick<
          Feedback,
          | 'id'
          | 'slug'
          | 'content'
          | 'createdAt'
          | 'userEmail'
          | 'userName'
          | 'formattedDate'
          | 'reaction'
        >
      >
    }
}

export type GetProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetProjectBySlugQuery = { __typename?: 'Query' } & {
  project: { __typename?: 'Project' } & Pick<
    Project,
    'id' | 'slug' | 'name' | 'allowedDomains' | 'notifyEmail'
  >
}

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>

export type GetProjectsQuery = { __typename?: 'Query' } & {
  projects: Array<
    { __typename?: 'Project' } & Pick<Project, 'id' | 'slug' | 'name'>
  >
}

export type RequestLoginLinkMutationVariables = Exact<{
  email: Scalars['String']
}>

export type RequestLoginLinkMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'requestLoginLink'
>

export type UpdateProfileMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}>

export type UpdateProfileMutation = { __typename?: 'Mutation' } & {
  updateProfile: { __typename?: 'CurrentUser' } & Pick<CurrentUser, 'id'>
}

export type UpdateProjectMutationVariables = Exact<{
  projectSlug: Scalars['String']
  name?: Maybe<Scalars['String']>
  allowedDomains?: Maybe<Scalars['String']>
  notifyEmail?: Maybe<Scalars['String']>
}>

export type UpdateProjectMutation = { __typename?: 'Mutation' } & {
  updateProject: { __typename?: 'Project' } & Pick<Project, 'id' | 'slug'>
}

export const CreateProjectDocument = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      slug
    }
  }
`
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      email
      name
    }
  }
`
export const DeleteFeedbackDocument = gql`
  mutation deleteFeedback($slug: String!) {
    deleteFeedback(slug: $slug)
  }
`
export const GetFeedbacksByProjectSlugDocument = gql`
  query getFeedbacksByProjectSlug($projectSlug: String!, $after: Int) {
    feedbacks(projectSlug: $projectSlug, after: $after) {
      nodes {
        id
        slug
        content
        createdAt
        userEmail
        userName
        formattedDate
        reaction
      }
      hasMore
    }
  }
`
export const GetProjectBySlugDocument = gql`
  query getProjectBySlug($slug: String!) {
    project(slug: $slug) {
      id
      slug
      name
      allowedDomains
      notifyEmail
    }
  }
`
export const GetProjectsDocument = gql`
  query getProjects {
    projects {
      id
      slug
      name
    }
  }
`
export const RequestLoginLinkDocument = gql`
  mutation requestLoginLink($email: String!) {
    requestLoginLink(email: $email)
  }
`
export const UpdateProfileDocument = gql`
  mutation updateProfile($name: String, $email: String) {
    updateProfile(name: $name, email: $email) {
      id
    }
  }
`
export const UpdateProjectDocument = gql`
  mutation updateProject(
    $projectSlug: String!
    $name: String
    $allowedDomains: String
    $notifyEmail: String
  ) {
    updateProject(
      projectSlug: $projectSlug
      name: $name
      allowedDomains: $allowedDomains
      notifyEmail: $notifyEmail
    ) {
      id
      slug
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    createProject(
      variables: CreateProjectMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateProjectMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateProjectMutation>(
            CreateProjectDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'createProject',
      )
    },
    currentUser(
      variables?: CurrentUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CurrentUserQuery>(CurrentUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'currentUser',
      )
    },
    deleteFeedback(
      variables: DeleteFeedbackMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteFeedbackMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteFeedbackMutation>(
            DeleteFeedbackDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'deleteFeedback',
      )
    },
    getFeedbacksByProjectSlug(
      variables: GetFeedbacksByProjectSlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetFeedbacksByProjectSlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetFeedbacksByProjectSlugQuery>(
            GetFeedbacksByProjectSlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getFeedbacksByProjectSlug',
      )
    },
    getProjectBySlug(
      variables: GetProjectBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetProjectBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetProjectBySlugQuery>(
            GetProjectBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getProjectBySlug',
      )
    },
    getProjects(
      variables?: GetProjectsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetProjectsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetProjectsQuery>(GetProjectsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getProjects',
      )
    },
    requestLoginLink(
      variables: RequestLoginLinkMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<RequestLoginLinkMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RequestLoginLinkMutation>(
            RequestLoginLinkDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'requestLoginLink',
      )
    },
    updateProfile(
      variables?: UpdateProfileMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateProfileMutation>(
            UpdateProfileDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'updateProfile',
      )
    },
    updateProject(
      variables: UpdateProjectMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateProjectMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateProjectMutation>(
            UpdateProjectDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'updateProject',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
