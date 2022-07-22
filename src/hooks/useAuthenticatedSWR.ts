import { useAuthenticator } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import type { BareFetcher, PublicConfiguration } from 'swr/dist/types'

import type { Header } from '@/libs/apiGateway'

export const useAuthenticatedSWR = <T>(
  key: string | null,
  fetcher: (key: string | null, header: Header) => Promise<T>,
  config:
    | Partial<PublicConfiguration<T, Error, BareFetcher<T>>>
    | undefined = {},
) => {
  const { user } = useAuthenticator()
  const [jwt, setJwt] = useState<string | null>(null)

  useEffect(() => {
    const session = user.getSignInUserSession()
    if (!session) return

    setJwt(session.getIdToken().getJwtToken())
  }, [user])

  return useSWR<T, Error>(
    jwt ? key : null,
    async () => await fetcher(key, { Authorization: jwt ?? '' }),
    config,
  )
}
