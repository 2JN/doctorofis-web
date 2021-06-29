import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  plan: {},
  subscriber: {},
  paymentCode: null,
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
    setPaymentCode: (state, action) => {
      state.paymentCode = action.payload
    },
  },
})

export const { setPlan, setSubscriber, setPaymentCode } = counterSlice.actions

export default counterSlice.reducer
