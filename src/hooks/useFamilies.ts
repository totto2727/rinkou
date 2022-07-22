import { getFamilies } from '@/models/families'

import { useAuthenticatedSWR } from './useAuthenticatedSWR'

export const useFamilies = () =>
  useAuthenticatedSWR(
    'families',
    async (_, header) => await getFamilies(header),
  )
