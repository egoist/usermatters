import Queue from 'bull'
import { sendLoginEmail, sendNewFeedbackEmail } from './mail'
import { prisma } from './prisma'

const REDIS_URL = process.env.REDIS_URL

const opts = {
  redis: REDIS_URL,
}

export const loginEmailQueue = new Queue<{
  userAgent: string
  email: string
  link: string
}>('sign up email', opts)

loginEmailQueue.process(async (job) => {
  await sendLoginEmail(job.data)
})

export const feedbackNotificationQueue = new Queue<{
  feedbackId: number
}>('feedback notification', opts)

feedbackNotificationQueue.process(async (job) => {
  const feedback = await prisma.feedback.findUnique({
    where: {
      id: job.data.feedbackId,
    },
    include: {
      project: true,
    },
  })
  if (!feedback) return

  const email = feedback.project.notifyEmail
  if (!email) return

  await sendNewFeedbackEmail(email, feedback.project, feedback)
})
