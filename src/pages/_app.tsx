import { AppProps } from 'next/app'

import 'minireset.css'
import '../base.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
