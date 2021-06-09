import { GetServerSideProps } from 'next'
import { middie } from '$server/lib/middie'
import { UserWithMembers } from '$server/decorators/gql-context'
import { authMiddleware, latestProjectMiddleware } from '$src/lib/middlewares'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>()
    .use(authMiddleware)
    .use(latestProjectMiddleware)
    .run(ctx)
}

export default function ProjectsPage() {
  return null
}
