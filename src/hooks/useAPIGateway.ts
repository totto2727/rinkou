import { useAuthenticator } from '@aws-amplify/ui-react'
import type { UseAuthenticator } from '@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useAuthenticator'
import type { AxiosInstance } from 'axios'

import { apiGateway } from '@/libs/apiGateway'

export const useAPIGateway: () => {
  apiGateway: AxiosInstance | undefined
} & UseAuthenticator = () => {
  const auth = useAuthenticator()
  const session = auth.user.getSignInUserSession()
  if (!session) {
    return { apiGateway: undefined, ...auth }
  }

  apiGateway.defaults.headers.common['Authorization'] = session
    .getIdToken()
    .getJwtToken()
  return {
    apiGateway,
    ...auth,
  }
}
