import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import connect from 'next-connect'
import { prisma } from './prisma'
import { ServerResponse } from 'http'
import { loginAndRedirect } from './auth'

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser<any>(function (obj, cb) {
  cb(null, obj)
})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${
          APP_DOMAIN ? `https://${APP_DOMAIN}` : ''
        }/api/connect/google/callback`,
      },
      async (accessToken, refreshToken, profile, cb) => {
        let existing = await prisma.user.findUnique({
          where: {
            googleUserId: profile.id,
          },
        })

        const email = profile.emails && profile.emails[0].value
        if (!email) return cb(new Error('missing email'))

        if (!existing) {
          existing = await prisma.user.findUnique({
            where: {
              email,
            },
          })
        }

        if (!existing) {
          // create user
          existing = await prisma.user.create({
            data: {
              email,
              name: profile.displayName || email.split('@')[0],
              googleUserId: profile.id,
            },
          })
        }

        cb(null, existing)
      },
    ),
  )
}

export { passport }

export const passportMiddleware = (slug: string, provider: 'google') => {
  const app = connect()
  app.use(passport.initialize())
  if (slug === provider) {
    return app.use(
      passport.authenticate(provider, {
        scope: ['email', 'profile'],
      }),
    )
  }
  if (slug === `${provider}/callback`) {
    return app
      .use(passport.authenticate(provider, { failureRedirect: '/login' }))
      .use((req: any, res: ServerResponse) => {
        loginAndRedirect(req.user.id, res)
      })
  }
  return (req: any, res: any) => res.end('404')
}
