import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { requiredStockpileDict } from '@/data/requiredStockpiles'
import { useAPIGateway } from '@/hooks/useAPIGateway'
import { useStockpileRecord } from '@/hooks/useStockpileMap'
import type { Stockpile } from '@/models/stockpile'

const Genre: NextPage = () => {
  const router = useRouter()
  const genre = router.query.genre as string | undefined
  const { apiGateway } = useAPIGateway()
  const { data: stockpileRecord, mutate } = useStockpileRecord()
  const [formValues, setFormValue] = useState<{
    term: string
    amount: number
    name?: string
  }>({
    term: '',
    amount: 0,
    name: '',
  })

  const stockpile = stockpileRecord ? stockpileRecord[genre ?? ''] : undefined
  const requiredStockpile = requiredStockpileDict[genre ?? '']

  const isLoading =
    !stockpileRecord ||
    !genre ||
    !apiGateway ||
    !stockpile ||
    !requiredStockpile

  useEffect(() => {
    if (!genre || !stockpileRecord || stockpile) {
      return
    }

    mutate(
      async () => {
        return {
          ...stockpileRecord,
          [genre]: {
            genre: genre,
            items: [],
          },
        }
      },
      {
        revalidate: false,
      },
    )
  }, [genre, mutate, stockpile, stockpileRecord])

  if (isLoading) {
    return <div>Loading</div>
  }

  const createHandlerClickDelete = (i: number) => () =>
    mutate(
      async () => {
        const res = await apiGateway.delete<Stockpile>('stockpiles', {
          data: {
            genre,
            items: stockpile.items.filter((_, j) => j != i),
          },
        })
        console.log(res)
        return {
          ...stockpileRecord,
          [res.data.genre]: res.data,
        }
      },
      {
        optimisticData: {
          ...stockpileRecord,
          [genre]: {
            genre,
            items: stockpile.items.filter((_, j) => j != i),
          },
        },
        revalidate: true,
      },
    )

  const newItem = {
    ...formValues,
    genre,
  }
  const newdata = {
    ...stockpileRecord,
    [genre]: {
      genre,
      items: [...(stockpileRecord[genre]?.items ?? []), formValues],
    },
  }

  const onClickPost = () => {
    mutate(
      async () => {
        const res = await apiGateway.post<Stockpile>('stockpiles', newItem)
        return {
          ...stockpileRecord,
          [res.data.genre]: res.data,
        }
      },
      {
        optimisticData: newdata,
        revalidate: true,
      },
    )
    setFormValue({
      term: '',
      amount: 0,
      name: '',
    })
  }

  const rows = stockpile.items.map((x, i) => (
    <tr key={i} className={'text-right'}>
      {requiredStockpile.requireName ? <td>{x.name}</td> : undefined}
      <td>{`${x.amount}${requiredStockpile.unit}`}</td>
      <td>{x.term.replaceAll('-', '/')}</td>
      <td>
        <button
          className={'btn btn-primary'}
          onClick={createHandlerClickDelete(i)}
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
              {requiredStockpile.requireName ? <th>名前</th> : undefined}
              <th>備蓄量</th>
              <th>期限</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[
              ...rows,
              <tr key={'form'} className={'text-right'}>
                {requiredStockpile.requireName ? (
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
                    onClick={onClickPost}
                    disabled={
                      !formValues.term.length ||
                      formValues.amount <= 0 ||
                      (requiredStockpile.requireName && !formValues.name)
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
