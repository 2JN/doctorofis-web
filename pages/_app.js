import { Provider } from 'react-redux'

import withInitialLoad from '../components/initial-load'

import store from '../lib/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const ComponentWithInitialLoad = withInitialLoad(Component)

  return (
    <Provider store={store}>
      <ComponentWithInitialLoad {...pageProps} />
    </Provider>
  )
}

export default MyApp
