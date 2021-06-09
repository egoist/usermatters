declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    DB_URL: string
    REDIS_URL?: string
    AUTH_SECRET: string
    AWS_ACCESS_KEY_ID: string
    AWS_ACCESS_KEY_SECRET: string
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
