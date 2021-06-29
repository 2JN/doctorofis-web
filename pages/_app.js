import { useEffect } from 'react'
import { Provider } from 'react-redux'

import axios from '../lib/axios'
import store from '../lib/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('auth-token'))
      axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('auth-token')
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
