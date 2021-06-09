import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { middie } from '$server/lib/middie'
import { UserWithMembers } from '$server/decorators/gql-context'
import { authMiddleware } from '$src/lib/middlewares'
import { DashboardLayout } from '$src/components/dash/DashboardLayout'
import { getProject, useUpdateProjectMutation } from '$src/lib/api'
import { ProjectHeader } from '$src/components/dash/ProjectHeader'
import { useFormik } from 'formik'
import { Button } from '$src/components/Button'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>().use(authMiddleware).run(ctx)
}

export default function ProjectSettingsPage({ user }: Props) {
  const router = useRouter()
  const projectSlug = router.query.project as string

  const project = getProject(projectSlug)
  const projectName = project.data?.project.name

  const updateProject = useUpdateProjectMutation()

  const form = useFormik({
    initialValues: {
      name: '',
      allowedDomains: '',
      notifyEmail: '',
    },
    async onSubmit(values) {
      await updateProject.mutateAsync({
        projectSlug,
        name: values.name,
        allowedDomains: values.allowedDomains,
        notifyEmail: values.notifyEmail,
      })
    },
  })

  React.useEffect(() => {
    if (project.isSuccess && !project.isPreviousData) {
      const { name, allowedDomains, notifyEmail } = project.data.project
      form.setValues({
        name,
        allowedDomains: allowedDomains || '',
        notifyEmail: notifyEmail || '',
      })
    }
  }, [project.isSuccess])

  return (
    <DashboardLayout title={projectName && `${projectName}`}>
      {project && <ProjectHeader projectSlug={projectSlug} user={user} />}
      <h2 className="border-b pb-3 mb-8 text-3xl font-bold">
        Project Settings
      </h2>

      <form className="w-full md:w-1/2" onSubmit={form.handleSubmit}>
        <div className="form-group">
          <label htmlFor="p-name" className="label">
            Project name
          </label>
          <input
            type="text"
            name="name"
            id="p-name"
            className="input w-full"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-domains" className="label">
            Allowed domains
          </label>
          <p className="help">
            Only allows feedbacks to be submitted from following domains
            (separated by comma)
          </p>
          <input
            type="text"
            name="allowedDomains"
            id="p-domains"
            className="input w-full"
            value={form.values.allowedDomains}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-notifyEmail" className="label">
            Email notifications
          </label>
          <p className="help">
            Following email addresses (at most 3) will be notified for new
            feedbacks. (separated by comma)
          </p>
          <input
            type="text"
            name="notifyEmail"
            id="p-notifyEmail"
            className="input w-full"
            value={form.values.notifyEmail}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div className="mt-6">
          <Button type="submit" variant="primary" isLoading={form.isSubmitting}>
            Save project settings
          </Button>
        </div>
      </form>
    </DashboardLayout>
  )
}
