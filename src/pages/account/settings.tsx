import { UserWithMembers } from '$server/decorators/gql-context'
import { middie } from '$server/lib/middie'
import { Button } from '$src/components/Button'
import { DashboardLayout } from '$src/components/dash/DashboardLayout'
import { useUpdateProfileMutation } from '$src/lib/api'
import { authMiddleware } from '$src/lib/middlewares'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

type Props = { user: UserWithMembers }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return middie<Props>().use(authMiddleware).run(ctx)
}

export default function AccountSettingsPage({ user }: Props) {
  const updateProfile = useUpdateProfileMutation()
  const router = useRouter()
  const form = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    async onSubmit(values) {
      await updateProfile.mutateAsync({
        name: values.name,
      })
      router.replace(router.asPath)
    },
  })
  return (
    <DashboardLayout title="Account Settings">
      <h2 className="text-3xl font-bold mb-8 border-b pb-3">
        Account Settings
      </h2>
      <section className="bg-white rounded-lg p-5 border" id="profile">
        <h3 className="border-b text-xl pb-2 mb-6 font-bold">Profile</h3>
        <form className="md:w-1/2" onSubmit={form.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Your email
            </label>
            <input
              type="email"
              id="email"
              disabled
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="input w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="label">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input w-full"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              isLoading={form.isSubmitting}
            >
              Save profile
            </Button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  )
}
