import { NextApiHandler } from 'next'
import cookie from 'cookie'

const handler: NextApiHandler = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('app_auth', '', { maxAge: 0, path: '/' }),
  )
  res.statusCode = 302
  res.setHeader('Location', '/')
  res.end()
}

export default handler
