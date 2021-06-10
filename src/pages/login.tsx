import { getCurrentUser } from '$server/lib/auth'
import { AppLayout } from '$src/components/AppLayout'
import { Button } from '$src/components/Button'
import { useLoginMutation } from '$src/lib/api'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
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
      <div className="md:w-1/2">
        <form onSubmit={form.handleSubmit}>
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
            <Button
              variant="primary"
              className="w-full"
              isLoading={form.isSubmitting}
            >
              Continue with Email
            </Button>
          </div>
        </form>
        <div className="separator">
          <span className="bg-white">OR</span>
        </div>
        <div>
          <Link href="/api/connect/google">
            <button
              type="button"
              className="space-x-2 border-indigo-500 border-2 inline-flex w-full text-indigo-500 h-10 items-center justify-center rounded-lg hover:bg-indigo-50 focus:outline-none"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                ></path>
              </svg>
              <span>Continue with Google</span>
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
