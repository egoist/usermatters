import { getCurrentUser } from '$server/lib/auth'
import { AppLayout } from '$src/components/AppLayout'
import { Button } from '$src/components/Button'
import { useLoginMutation } from '$src/lib/api'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getCurrentUser(ctx.req)
  if (user) {
    return {
      redirect: {
        destination: `/projects`,
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default function LoginPage() {
  const login = useLoginMutation()
  const form = useFormik({
    initialValues: {
      email: '',
    },
    async onSubmit({ email }) {
      await login.mutateAsync({ email })
    },
  })
  return (
    <AppLayout title="Login">
      <h2 className="font-bold text-3xl mb-6 border-b border-gray-200 pb-5">
        Sign up / Log In
      </h2>
      {login.isSuccess && (
        <div className="bg-green-500 text-white p-5 rounded-lg mb-5">
          We just sent a login link to your email address, please open your
          inbox and click the link to login!{' '}
          {form.values.email.endsWith('@gmail.com') && (
            <a
              className="underline"
              href="https://mail.google.com"
              target="_blank"
            >
              Open Gmail
            </a>
          )}
        </div>
      )}
      <form onSubmit={form.handleSubmit} className="md:w-1/2">
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="input w-full"
            value={form.values.email}
            onChange={form.handleChange}
          />
        </div>
        <div className="mt-6">
          <Button variant="primary" isLoading={form.isSubmitting}>
            Continue with Email
          </Button>
        </div>
      </form>
    </AppLayout>
  )
}
