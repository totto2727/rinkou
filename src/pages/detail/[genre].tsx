import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { requireStockpilesDict } from '@/data/requiredStockpiles'
import { stockpileGet } from '@/data/stockpileGet'
import { useAPI, useAxios } from '@/hooks/useAPI'

type Stockpile = {
  items: { term: string; amount: number; name?: string }[]
  genre: string
  requiredName: boolean
}

const useStockpiles = () =>
  useAPI<Record<string, Stockpile>>('/stockpilesdict', async (header) => {
    const stockpiles = stockpileGet
    const stockpileDict: Record<string, Stockpile> = {}
    stockpiles.forEach((x) => (stockpileDict[x.genre] = x))
    return stockpileDict
  })

const Genre: NextPage = () => {
  const router = useRouter()
  const genre = router.query.genre as string
  const axios = useAxios()
  const { data, mutate } = useStockpiles()
  const [formValues, setFormValue] = useState<{
    term: string
    amount: number
    name?: string
  }>({
    term: '',
    amount: 0,
    name: '',
  })

  console.log(data)
  if (!data) {
    return <div>Loading</div>
  }

  const requiredStockpile = requireStockpilesDict[genre]
  const stockpile = data[genre]
  if (!stockpile) {
    mutate(
      {
        ...data,
        [genre]: {
          genre: genre,
          requiredName: requiredStockpile.requireName,
          items: [],
        },
      },
      false,
    )
    return <div>Loading</div>
  }

  const rows = stockpile.items.map((x, i) => (
    <tr key={i} className={'text-right'}>
      {stockpile.requiredName ? <td>{x.name}</td> : undefined}
      <td>{`${x.amount}${requiredStockpile.unit}`}</td>
      <td>{x.term.replaceAll('-', '/')}</td>
      <td>
        <button
          className={'btn btn-primary'}
          onClick={async () => {
            mutate(
              {
                ...data,
                [genre]: {
                  ...data[genre],
                  items: stockpile.items.filter((_, j) => j != i),
                },
              },
              false,
            )
            await axios.post('test', formValues)
          }}
        >
          削除
        </button>
      </td>
    </tr>
  ))

  return (
    <main>
      <div className={'overflow-x-auto'}>
        <table className={'table w-full'}>
          <thead>
            <tr>
              {stockpile.requiredName ? <th>名前</th> : undefined}
              <th>備蓄量</th>
              <th>期限</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[
              ...rows,
              <tr key={'form'} className={'text-right'}>
                {stockpile.requiredName ? (
                  <td>
                    <input
                      type={'text'}
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValue({ ...formValues, name: e.target.value })
                      }
                      className={'input input-primary'}
                    />
                  </td>
                ) : undefined}
                <td className={'flex flex-row justify-end items-center'}>
                  <input
                    type={'number'}
                    value={`${formValues.amount}`}
                    className={'input input-primary'}
                    onChange={(e) =>
                      setFormValue({
                        ...formValues,
                        amount: parseInt(e.target.value, 10),
                      })
                    }
                  />
                  <div className={'m-0'}>{requiredStockpile?.unit}</div>
                </td>
                <td>
                  <input
                    type={'date'}
                    value={formValues.term}
                    className={'input input-primary'}
                    onChange={(e) =>
                      setFormValue({
                        ...formValues,
                        term: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    className={'btn btn-primary'}
                    onClick={async () => {
                      mutate(
                        {
                          ...data,
                          [genre]: {
                            ...data[genre],
                            items: [...data[genre].items, formValues],
                          },
                        },
                        false,
                      )
                      setFormValue({
                        term: '',
                        amount: 0,
                        name: '',
                      })
                      await axios.post('test', formValues)
                    }}
                    disabled={
                      !formValues.term.length ||
                      formValues.amount <= 0 ||
                      (data.requiredName && !formValues.name)
                    }
                  >
                    追加
                  </button>
                </td>
              </tr>,
            ]}
          </tbody>
        </table>
      </div>
    </main>
  )
}
export default Genre
