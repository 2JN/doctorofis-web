import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function useProtected(loggedIn, redirect) {
  const router = useRouter()
  const user = useSelector((state) => state.user)
  const [state, setState] = useState({
    loading: true,
  })

  useEffect(() => {
    if (user.loading) return

    if (user.loggedIn === loggedIn) router.push(redirect)
    else
      setState({
        loading: false,
      })
  }, [user.loading])

  return state
}
