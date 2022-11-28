import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Web3ContextProvider} from '../context/Web3ContextProvider'

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>

  )
}

export default MyApp
