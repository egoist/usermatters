declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string
    NEXT_PUBLIC_APP_DOMAIN?: string
    GOOGLE_CLIENT_ID?: string
    GOOGLE_CLIENT_SECRET?: string
    DB_URL: string
    REDIS_URL?: string
    AUTH_SECRET: string
    MAILGUN_API_KEY: string
    MAILGUN_DOMAIN: string
  }
  interface Global {
    _singletons: Record<string, any>
  }
}

type $TsFixMe = any

declare namespace Express {
  interface User {
    id: number
  }
}

declare module 'babel-plugin-superjson-next/tools'
