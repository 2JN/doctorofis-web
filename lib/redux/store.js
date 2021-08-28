import { configureStore } from '@reduxjs/toolkit'

import subscription from './slices/subscription'
import user from './slices/user'

export default configureStore({
  reducer: {
    subscription,
    user,
  },
})
