import { getStockpileRecord } from '@/models/stockpile'

import { useAuthenticatedSWR } from './useAuthenticatedSWR'

export const useStockpileRecord = () =>
  useAuthenticatedSWR(
    '/stockpileMap',
    async (_, header) => await getStockpileRecord(header),
  )
