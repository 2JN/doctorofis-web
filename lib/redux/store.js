import { configureStore } from '@reduxjs/toolkit'
import subscription from './slices/subscription'

export default configureStore({
  reducer: {
    subscription,
  },
})
