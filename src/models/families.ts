import type { Header } from '@/libs/apiGateway'
import { apiGateway } from '@/libs/apiGateway'

type Family = 'adult'
type Families = Record<Family, number>

export const getFamilies = async (header: Header): Promise<Families> => {
  const res = await apiGateway.get<Families>('families', { headers: header })
  return res.data
}
