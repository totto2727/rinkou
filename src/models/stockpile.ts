import type { Header } from '@/libs/apiGateway'
import { apiGateway } from '@/libs/apiGateway'

export type Stockpile = {
  items: { term: string; amount: number; name?: string }[]
  genre: string
}

export const getStockpiles = async (header: Header) => {
  const res = await apiGateway.get<Stockpile[]>('stockpiles', {
    headers: header,
  })
  return res.data
}

export const getStockpileRecord = async (header: Header) => {
  const stockpiles = await getStockpiles(header)
  const stockpileMap: Map<string, Stockpile> = new Map()
  stockpiles.forEach((x) => stockpileMap.set(x.genre, x))
  const stockpileRecord: Partial<Record<string, Stockpile>> =
    Object.fromEntries(stockpiles.map((x) => [x.genre, x]))
  return stockpileRecord
}
