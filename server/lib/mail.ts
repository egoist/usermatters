import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import { Feedback, Project } from '@prisma/client'
import { formatDateWithTimezone } from './date'
import { parseUserAgent } from './ua'

const DOMAIN = process.env.MAILGUN_DOMAIN

const mailgun = new Mailgun(FormData as any)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net',
})

export const sendLoginEmail = async ({
  userAgent,
  email,
  link,
}: {
  userAgent: string
  email: string
  link: string
}) => {
  const ua = parseUserAgent(userAgent)

  const browser = ua.browser.name
  const os = ua.os.name
  const userInfo = [browser, os].filter(Boolean).join(', ')

  await mg.messages.create(DOMAIN, {
    from: 'UserMatters support@usermatters.co',
    to: email,
    subject: 'Log in to User Matters',
    html: `
    <p>
      Click the link below to log in to User Matters.
    </p>
    
    <a href="${link}"><strong>Log in</strong></a>

    <p>
      This link will expire in 10 minutes.
    </p>

    <p>This login was requested ${
      userInfo && `using ${userInfo}`
    } at ${formatDateWithTimezone(new Date())}.</p>

    <p>&copy; User Matters</p>
    `,
  })
}

export const sendNewFeedbackEmail = async (
  to: string,
  project: Project,
  feedback: Feedback,
) => {
  const deviceInfo = [feedback.browser, feedback.os].filter(Boolean).join(', ')

  const html = `
  <p>Your project "<strong>${
    project.name
  }</strong>" just received a new feedback:</p>
  
  <p style="padding:10px;background-color:#e2e2e2;border-radius:4px;">${
    feedback.content
  }</p>
  
  <p>This feedback is created by ${feedback.userName} (${feedback.userEmail})${
    deviceInfo && ` using ${deviceInfo}`
  } at ${formatDateWithTimezone(
    feedback.createdAt,
  )}. You can directly reply this email to reply this feedback.</p>
  
      <p style="color:#ccc">You can unsubscribe this email by going to <a href="https://usermatters.co/projects/${
        project.slug
      }/settings">project settings</a>.</p>
      `

  if (process.env.NODE_ENV !== 'production') {
    console.log(`sending`, html)
    return
  }

  await mg.messages.create(DOMAIN, {
    from: `${feedback.userName} new_feedback@usermatters.co`,
    to: to
      .split(',')
      .map((v) => v.trim())
      .slice(0, 3),
    subject: `[${project.name}] New feedback from ${feedback.userName}`,
    'h:Reply-To': feedback.userEmail,
    html,
  })
}
