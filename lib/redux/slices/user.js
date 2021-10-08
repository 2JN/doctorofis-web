import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    id: 0,
    blocked: false,
    confirmed: false,
    created_at: '',
    email: '',
    provider: 'local',
    role: null,
    updated_at: '',
    username: '',
    subscriber: null,
  },
  loading: true,
  loggedIn: false,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => ({
      loading: false,
      data: action.payload,
      loggedIn: true,
    }),
    setUserLoad: (state, action) => {
      state.loading = action.payload
    },
    logOutUser: () => ({ ...initialState, loading: false }),
  },
})

export const { setUserData, setUserLoad, logOutUser } = counterSlice.actions

export default counterSlice.reducer
