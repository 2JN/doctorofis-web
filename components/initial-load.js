import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import axios from '../lib/axios'
import { setUserData, setUserLoad } from '../lib/redux/slices/user'

export default function withInitialLoad(WrappedComponent) {
  return (props) => {
    const dispatch = useDispatch()

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

        dispatch(setUserLoad(true))

        axios
          .get('/users/me')
          .then((res) => {
            dispatch(setUserData(res.data))
          })
          .catch((err) => {
            console.error(err)

            dispatch(setUserLoad(false))
          })
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}
