import { useEffect } from 'react'

import axios from '../lib/axios'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('auth-token'))
      axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('auth-token')
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
