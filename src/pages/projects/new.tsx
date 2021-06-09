import { UserWithMembers } from '$server/decorators/gql-context'
import { middie } from '$server/lib/middie'
import { Button } from '$src/components/Button'
import { DashboardLayout } from '$src/components/dash/DashboardLayout'
import { authMiddleware } from '$src/lib/middlewares'
import { GetServerSideProps } from 'next'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCreateProjectMutation } from '$src/lib/api'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>().use(authMiddleware).run(ctx)
}

export default function NewProjectPage({ user }: Props) {
  const isFirstProject = user.members.length === 0
  const router = useRouter()
  const createProjectMutation = useCreateProjectMutation()
  const form = useFormik({
    initialValues: {
      name: '',
    },
    async onSubmit(values) {
      const data = await createProjectMutation.mutateAsync({
        name: values.name,
      })
      router.push(`/projects/${data.createProject.slug}`)
    },
  })
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-3 border-b pb-3">New Project</h2>
      {isFirstProject && (
        <div className="mb-8">😎 Create your first project.</div>
      )}
      <form className="w-full md:w-1/2" onSubmit={form.handleSubmit}>
        <div className="form-group">
          <label htmlFor="p-name" className="label">
            Project name
          </label>
          <input
            type="text"
            id="p-name"
            name="name"
            required
            className="input w-full"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div className="mt-6">
          <Button isLoading={form.isSubmitting} type="submit" variant="primary">
            Create Project
          </Button>
        </div>
      </form>
    </DashboardLayout>
  )
}
