import type { NextPage } from 'next'
import Link from 'next/link'

import { familiesGet } from '@/data/familiesGet'
import { requireStockpiles } from '@/data/requiredStockpiles'
import { stockpileGet } from '@/data/stockpileGet'
import { useAPI } from '@/hooks/useAPI'

type Stockpile = {
  items: { term: string; amount: number; name?: string }[]
  genre: string
  requiredName: boolean
}
const useStockpiles = () =>
  useAPI<Stockpile[]>('/stockpiles', async (header) => stockpileGet)

type Families = { adult: number }
const useFamilies = () =>
  useAPI<Families>('/user/setting/families', async (header) => familiesGet)

const Index: NextPage = () => {
  const { data: stockpiles } = useStockpiles()
  const { data: families } = useFamilies()
  if (!stockpiles || !families) {
    return <div>Loading</div>
  }

  const stockpileDict: Partial<Record<string, Omit<Stockpile, 'genre'>>> = {}
  stockpiles.forEach((x) => (stockpileDict[x.genre] = x))

  const cards = requireStockpiles.map((x) => {
    const required = x.amountRequired * families.adult
    const stock =
      stockpileDict[x.name]?.items.reduce((y, z) => y + z.amount, 0) ?? 0
    return (
      <Link href={`detail/${x.name}`} key={x.name}>
        <a>
          <div
            className={`card shadow ${
              stock < required
                ? 'bg-error text-error-content'
                : 'bg-info text-primary-content'
            } hover:cursor-pointer`}
          >
            <div className={'card-body'}>
              <div
                className={
                  'card-title whitespace-nowrap text-ellipsis overflow-hidden'
                }
              >
                {x.name}
              </div>
              <div>
                <div
                  className={'whitespace-nowrap text-ellipsis'}
                >{`必要な量: ${required}${x.unit}`}</div>
                <div
                  className={'whitespace-nowrap text-ellipsis'}
                >{`備蓄量: ${stock}${x.unit}`}</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    )
  })

  return (
    <main>
      <div className={'m-4'}>
        <div>災害の対策していますか？</div>
        <div>持っている災害グッズを登録してください</div>
        <div
          className={
            'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
          }
        >
          {cards}
        </div>
      </div>
    </main>
  )
}

export default Index
