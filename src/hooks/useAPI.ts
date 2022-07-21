import { useAuthenticator } from '@aws-amplify/ui-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { SWRResponse } from 'swr'
import useSWR from 'swr'

export const endpoint = process.env.NEXT_PUBLIC_API_GATEWAY_ENDPOINT as string

export const useAxios = () => {
  const { user } = useAuthenticator()
  return axios.create({
    baseURL: endpoint,
    headers: {
      Authorization:
        user.getSignInUserSession()?.getIdToken().getJwtToken() ?? '',
    },
  })
}
export const useAPI = <T>(
  key: string | null,
  // 認証用のヘッダーを受け取れる非同期関数を受け取る
  fetcher: (header: { Authorization: string }) => Promise<T>,
): SWRResponse<T, Error> => {
  const { user } = useAuthenticator()
  const [jwt, setJwt] = useState<string | undefined>(undefined)

  useEffect(() => {
    const session = user.getSignInUserSession()
    if (!session) return

    setJwt(session.getIdToken().getJwtToken())
  }, [user])

  return useSWR(
    jwt ? `${key}` : null,
    async () => await fetcher({ Authorization: jwt ?? '' }),
  )
}
