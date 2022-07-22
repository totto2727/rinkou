import type { NextPage } from 'next'
import Link from 'next/link'

import { requiredStockpiles } from '@/data/requiredStockpiles'
import { useFamilies } from '@/hooks/useFamilies'
import { useStockpileRecord } from '@/hooks/useStockpileMap'

const Index: NextPage = () => {
  const { data: stockpileRecord } = useStockpileRecord()
  const { data: families } = useFamilies()
  if (!stockpileRecord || !families) {
    return <div>Loading</div>
  }

  const cards = requiredStockpiles.map((requiredStockpile) => {
    const required = requiredStockpile.amountRequired * families.adult
    const totalAmount =
      stockpileRecord[requiredStockpile.name]?.items.reduce(
        (x, stockpile) => x + stockpile.amount,
        0,
      ) ?? 0
    return (
      <Link
        href={`detail/${requiredStockpile.name}`}
        key={requiredStockpile.name}
      >
        <a>
          <div
            className={`card shadow ${
              totalAmount < required
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
                {requiredStockpile.name}
              </div>
              <div>
                <div
                  className={'whitespace-nowrap text-ellipsis'}
                >{`必要な量: ${required}${requiredStockpile.unit}`}</div>
                <div
                  className={'whitespace-nowrap text-ellipsis'}
                >{`備蓄量: ${totalAmount}${requiredStockpile.unit}`}</div>
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
