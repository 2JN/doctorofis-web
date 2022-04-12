import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  plan: {},
  subscriber: {},
  beneficiaries: [],
}

export const counterSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload
    },
    setSubscriber: (state, action) => {
      state.subscriber = action.payload
    },
    setBeneficiaries: (state, action) => {
      state.beneficiaries = action.payload
    },
  },
})

export const { setPlan, setSubscriber, setBeneficiaries } = counterSlice.actions

export default counterSlice.reducer
