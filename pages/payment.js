import Head from 'next/head'
import { useEffect } from 'react'

import Nav from '../components/nav'
import axios from '../lib/axios'
import styles from '../styles/payment.module.css'

export default function Payment() {
  useEffect(() => {
    const jsPaymentClient = new TwoPayClient(
      process.env.NEXT_PUBLIC_2CHECKOUT_MERCHANT_CODE
    )
    jsPaymentClient.setup.setLanguage('es')

    const component = jsPaymentClient.components.create('card', styles2payjs)
    component.mount(`#${styles.cardElement}`)

    document
      .getElementById('payment-form')
      .addEventListener('submit', async (event) => {
        event.preventDefault()

        const billingDetails = {
          name: document.querySelector('#name').value,
        }

        const res = await jsPaymentClient.tokens
          .generate(component, billingDetails)
          .catch((err) => {
            console.error(err)
          })

        console.log(res.token)
        const subRes = await axios
          .post('/subscribers', {
            eesToken: res.token,
          })
          .catch((err) => {
            console.error(err)
          })

        console.log(subRes)
      })
  }, [])

  return (
    <>
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Head>
          <script
            type="text/javascript"
            src="https://2pay-js.2checkout.com/v1/2pay.js"
          ></script>
        </Head>

        <form type="post" id="payment-form" id="payment-form">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-3 rounded-sm"
              required
            />
          </div>

          <div id={styles.cardElement} />

          <div class="pt-5 flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Aceptar
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

const styles2payjs = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  margin: '0',
  maxWidth: '100%',
  '*': {
    'boxSizing': 'border-box'
  },
  form: {
    overflow: 'hidden',
    paddingRight: '1px',
    paddingLeft: '1px',
  },
  label: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  '.row': {
    display: 'flex',
    marginTop: '0.75rem',
    marginRight: '-0.75rem'
  },
  '.col': {
    width: '100%',
    maxWidth: '100%',
    flex: '1 1 auto',
    marginRight: '0.75rem',
  },
  '.error-icon': {
    display: 'none',
  },
  '.lock-icon': {
    display: 'none',
  },
  '.input-wrapper': {
    marginTop: '0.75rem',
    position: 'relative',
    paddingBottom: '1px'
  },
  'input': {
    border: '1px solid #6b7280',
    borderRadius: '0.125rem',
    padding: '0.5rem 0.75rem',
    width: '100%',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    outline: 0
  },
  'input:focus': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgb(37, 99, 235) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    borderColor: '#2563eb',
  },
  '.validation-message': {
    fontSize: '0.75rem',
    lineHeight: '1rem'
  },
  '.lock-icon': {
    display: 'none'
  },
  '.valid-icon': {
    'display': 'none'
  },
  '.error-icon': {
    display: 'none'
  },
  '.card-icon': {
    top: 'calc(50% - 10px)',
    left: '10px',
    display: 'none'
  },
  '.is-empty .card-icon': {
    display: 'block'
  },
  '.is-focused .card-icon': {
    display: 'none'
  },
  '.card-type-icon': {
    right: '30px',
    display: 'block'
  },
  '.card-type-icon.visa': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.mastercard': {
    top: 'calc(50% - 14.5px)'
  },
  '.card-type-icon.amex': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.discover': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.jcb': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.dankort': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.cartebleue': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.diners': {
    top: 'calc(50% - 14px)'
  },
  '.card-type-icon.elo': {
    top: 'calc(50% - 14px)'
  }
}
