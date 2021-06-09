import { IncomingMessage } from 'http'
import { sign, verify } from 'jsonwebtoken'
import cookie from 'cookie'
import { prisma } from './prisma'

export const generateLoginCode = (email: string) => {
  return sign({ email }, process.env.AUTH_SECRET, { expiresIn: '10minutes' })
}

export const verifyLoginCode = (code: string) => {
  return verify(code, process.env.AUTH_SECRET) as { email: string }
}

export const generateAuthCookie = (uid: number) => {
  const jwt = sign({ uid }, process.env.AUTH_SECRET, { expiresIn: '30d' })
  return cookie.serialize('app_auth', jwt, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
  })
}

export const verifyAuthCookie = (value?: string) => {
  if (!value) return null
  const { app_auth } = cookie.parse(value)
  return app_auth
    ? (verify(app_auth, process.env.AUTH_SECRET) as { uid: number })
    : null
}

export const getCurrentUser = async (req: IncomingMessage) => {
  const parsed = verifyAuthCookie(req.headers.cookie)

  if (!parsed) return null

  const user = await prisma.user.findUnique({
    where: {
      id: parsed.uid,
    },
    include: {
      members: {
        include: {
          project: true,
        },
      },
    },
  })
  return user
}
