import type { Header } from '@/libs/apiGateway'

type Family = 'adult'
type Families = Record<Family, number>

// TODO families GET
export const getFamilies = async (header: Header): Promise<Families> => {
  return {
    adult: 3,
  }
}
