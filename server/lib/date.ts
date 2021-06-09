import dayjs from 'dayjs'
import advancedFormatPlugin from 'dayjs/plugin/advancedFormat'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import utcPlugin from 'dayjs/plugin/utc'
import timezonePlugin from 'dayjs/plugin/timezone'

dayjs.extend(relativeTimePlugin)
dayjs.extend(advancedFormatPlugin)
dayjs.extend(utcPlugin)
dayjs.extend(timezonePlugin)

export const timeago = (date: string | Date) => {
  return dayjs(date).fromNow()
}

export const formatDateWithTimezone = (date: string | Date) => {
  return dayjs(date).format(`MMM D, YYYY hh:mm A z`)
}
