import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  blocked: false,
  confirmed: false,
  created_at: '',
  email: '',
  provider: 'local',
  role: null,
  subscriber: null,
  updated_at: '',
  username: '',
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      return (state = action.payload)
    },
  },
})

export const { setUser } = counterSlice.actions

export default counterSlice.reducer
