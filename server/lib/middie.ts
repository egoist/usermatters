import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { withSuperJSONProps } from 'babel-plugin-superjson-next/tools'

type SetProp<Props> = <TKey extends keyof Props>(
  key: TKey,
  value: Props[TKey],
) => void

type GetProp<Props> = <TKey extends keyof Props>(key: TKey) => Props[TKey]

type Redirect = (url: string, permanent?: boolean) => false

export type WareContext<Props> = Pick<
  GetServerSidePropsContext,
  'req' | 'res' | 'params'
> & {
  setProp: SetProp<Props>
  getProp: GetProp<Props>
  redirect: Redirect
}

type MaybePromise<T> = T | Promise<T>

type Ware<Props = any> = (
  ctx: WareContext<Props>,
  result: GetServerSidePropsResult<Props>,
) => MaybePromise<null | undefined | void | false>

export const middie = <Props extends Record<string, any> = {}>() => {
  const wares: Ware<Props>[] = []

  const m = {
    use(ware: Ware<Props>) {
      wares.push(ware)
      return m
    },

    async run(_ctx: {
      req: GetServerSidePropsContext['req']
      res: GetServerSidePropsContext['res']
      params?: GetServerSidePropsContext['params']
    }): Promise<GetServerSidePropsResult<Props>> {
      const result: any = {}
      const setProp: SetProp<Props> = (key, value) => {
        result.props = result.props || {}
        result.props[key] = value
      }
      const getProp: GetProp<Props> = (key) => {
        if (!result.props || !(key in result.props)) {
          throw new Error(`prop "${key}" does not exist`)
        }
        return result.props[key]
      }
      const redirect: Redirect = (url, permanent) => {
        result.redirect = {
          destination: url,
          permanent: !!permanent,
        }
        return false
      }
      const ctx = { ..._ctx, setProp, getProp, redirect }
      for (const ware of wares) {
        const r = await ware(ctx, result)
        if (r === false) break
      }
      if (result.props) {
        return withSuperJSONProps(() => result)()
      }
      return result
    },
  }

  return m
}
