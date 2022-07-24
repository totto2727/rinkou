import { useAuthenticator } from '@aws-amplify/ui-react'
import type { NextPage } from 'next'
import type { ChangeEventHandler, MouseEventHandler } from 'react'

import { Families } from '@/data/familiesGet'
import { useFamilies } from '@/hooks/useFamilies'
import { apiGateway } from '@/libs/apiGateway'

const Families: NextPage = () => {
  const { data, mutate } = useFamilies()
  const { user } = useAuthenticator()
  if (!user) {
    ;<div>loading</div>
  }

  const onChangeAdult: ChangeEventHandler<HTMLInputElement> = (e) =>
    mutate(async () => {
      return { ...data, adult: parseInt(e.target.value, 10) }
    }, false)

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    mutate(
      async () => {
        console.log(data)
        const res = await apiGateway.post<Families>('families', data, {
          headers: {
            Authorization: user
              .getSignInUserSession()
              ?.getIdToken()
              .getJwtToken() as string,
          },
        })
        return res.data
      },
      // TODO
      { optimisticData: data, revalidate: false },
    )
  }

  return (
    <main className={'grid justify-center'}>
      <div className={'my-4 w-full text-center text-4xl'}>家族構成</div>
      <div className={'flex flex-col justify-center items-center gap-4 w-fit'}>
        <label className={'flex flex-row justify-center input-group'}>
          <span>大人</span>
          <input
            type={'number'}
            name={'adult'}
            className={'input input-primary input-bordered text-right text-lg'}
            value={data?.adult}
            onChange={onChangeAdult}
          />
          <span>人</span>
        </label>
        <button className={'btn btn-primary w-full'} onClick={onClick}>
          更新
        </button>
      </div>
    </main>
  )
}

export default Families
