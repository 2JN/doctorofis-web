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
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {
        loading: false,
        data: action.payload,
      }
    },
    setUserLoad: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setUserData, setUserLoad } = counterSlice.actions

export default counterSlice.reducer