import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  plan: {},
  subscriber: {},
  beneficiaries: [],
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
    setBeneficiaries: (state, action) => {
      state.beneficiaries = action.payload
    },
    setPaymentCode: (state, action) => {
      state.paymentCode = action.payload
    },
  },
})

export const { setPlan, setSubscriber, setBeneficiaries, setPaymentCode } =
  counterSlice.actions

export default counterSlice.reducer
