import './globals.css'
import '@aws-amplify/ui-react/styles.css'

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import awsExports from '@/aws-exports'

Amplify.configure(awsExports)

type MainProps = { children: ReactNode }
const Main = ({ children }: MainProps) => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const { signOut } = useAuthenticator()

  return (
    <div className={'m-0 h-0 font-sans box-border'}>
      <header>
        <nav className={'px-20 py-3 navbar bg-neutral'}>
          <div className={'w-full flex justify-between'}>
            <div className={'text-neutral-content'}>
              <Link href={'/'}>
                <a>
                  <div className={'text-xl'}>備蓄管理</div>
                </a>
              </Link>
            </div>
            <div className={'flex gap-8'}>
              <Link href={'/families'}>
                <a>
                  <button className={'btn btn-primary'}>家族構成</button>
                </a>
              </Link>
              <select data-choose-theme className={'select select-primary'}>
                <option value={'light'}>Light</option>
                <option value={'dark'}>Dark</option>
              </select>
              <button
                className={'max-w-[12rem] btn btn-primary flex-auto'}
                onClick={signOut}
              >
                SignOut
              </button>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </div>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <div>
      <Authenticator>
        <Main>
          <Component {...pageProps} />
        </Main>
      </Authenticator>
    </div>
  )
}

export default App
