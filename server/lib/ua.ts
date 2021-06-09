import { UAParser } from 'ua-parser-js'

export const parseUserAgent = (userAgent: string) => {
  const parser = new UAParser(userAgent)
  return {
    browser: parser.getBrowser(),
    os: parser.getOS(),
  }
}
