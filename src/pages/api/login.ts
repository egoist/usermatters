import { generateAuthCookie, verifyLoginCode } from '$server/lib/auth'
import { prisma } from '$server/lib/prisma'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const code = req.query.code as string
  const { email } = verifyLoginCode(code)
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
        emailVerified: new Date(),
      },
    })
  }
  res.setHeader('set-cookie', generateAuthCookie(user.id))
  res.setHeader('Location', '/projects')
  res.statusCode = 302
  res.end()
}

export default handler
