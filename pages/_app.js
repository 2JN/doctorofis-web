import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import axios from '../lib/axios'
import { setUserData, setUserLoad } from '../lib/redux/slices/user'

import store from '../lib/redux/store'
import '../styles/globals.css'

const persistor = persistStore(store)

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    axios.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if (err.response.status === 401) {
          localStorage.removeItem('auth-token')
          delete axios.defaults.headers.common['Authorization']
        }

        return Promise.reject(err)
      }
    )

    if (localStorage.getItem('auth-token')) {
      axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('auth-token')

      store.dispatch(setUserLoad(true))

      axios
        .get('/users/me')
        .then((res) => {
          store.dispatch(setUserData(res.data))
        })
        .catch((err) => {
          console.error(err)

          store.dispatch(setUserLoad(false))
        })
    } else {
      store.dispatch(setUserLoad(false))
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
