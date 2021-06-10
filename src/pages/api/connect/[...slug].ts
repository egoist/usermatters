import { passportMiddleware } from '$server/lib/passport'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const slug = Array.isArray(req.query.slug)
    ? req.query.slug.join('/')
    : req.query.slug
  const middleware = passportMiddleware(slug, 'google')
  return middleware(req, res)
}

export default handler
