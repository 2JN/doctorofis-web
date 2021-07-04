import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import clsx from 'clsx'

import Nav from '../components/nav'
import styles from '../styles/payment.module.css'
import { setPaymentCode } from '../lib/redux/slices/subscription'

export default function Payment() {
  const router = useRouter()
  const [state, setState] = useState({
    loading: true,
    data: {},
  })
  const dispatch = useDispatch()
  const subscription = useSelector((state) => state.subscription)

  useEffect(() => {
    if (isEmpty(subscription.plan) || isEmpty(subscription.subscriber))
      router.push('/signup')
    else {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }))

      const jsPaymentClient = new TwoPayClient(
        process.env.NEXT_PUBLIC_2CHECKOUT_MERCHANT_CODE
      )
      jsPaymentClient.setup.setLanguage('es')

      const component = jsPaymentClient.components.create('card', styles2payjs)
      component.mount(`#${styles.cardElement}`)

      document
        .getElementById('payment-form')
        ?.addEventListener('submit', async (event) => {
          event.preventDefault()
          setState((prevState) => ({
            ...prevState,
            loading: true,
          }))

          const billingDetails = {
            name: document.querySelector('#name').value,
          }

          const res = await jsPaymentClient.tokens
            .generate(component, billingDetails)
            .catch((err) => {
              console.error(err)
              setState((prevState) => ({
                ...prevState,
                loading: false,
              }))

              // TODO: show errors
            })

          dispatch(setPaymentCode(res.token))
          router.push('/checkout')
        })
    }
  }, [])

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value,
      },
    }))
  }

  return (
    <>
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información de Pago
          </h3>

          {state.loading && (
            <div className="flex justify-center">
              <svg
                className="w-16 md:w-24 mt-12 text-gray-800 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}

          <form
            type="post"
            id="payment-form"
            className={clsx({ hidden: state.loading }, 'pt-8 sm:pt-5')}
          >
            <div className="form-group">
              <label htmlFor="name" className="block text-sm">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full mt-3 rounded-sm"
                required
              />
            </div>

            <div id={styles.cardElement} />

            <div className="pt-5 flex justify-end">
              <Link href="/signup">
                <a className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Volver
                </a>
              </Link>

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
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
    boxSizing: 'border-box',
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
    marginRight: '-0.75rem',
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
    paddingBottom: '1px',
  },
  input: {
    border: '1px solid #6b7280',
    borderRadius: '0.125rem',
    padding: '0.5rem 0.75rem',
    width: '100%',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    outline: 0,
  },
  'input:focus': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgb(37, 99, 235) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    borderColor: '#2563eb',
  },
  '.validation-message': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  '.lock-icon': {
    display: 'none',
  },
  '.valid-icon': {
    display: 'none',
  },
  '.error-icon': {
    display: 'none',
  },
  '.card-icon': {
    top: 'calc(50% - 10px)',
    left: '10px',
    display: 'none',
  },
  '.is-empty .card-icon': {
    display: 'block',
  },
  '.is-focused .card-icon': {
    display: 'none',
  },
  '.card-type-icon': {
    right: '30px',
    display: 'block',
  },
  '.card-type-icon.visa': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.mastercard': {
    top: 'calc(50% - 14.5px)',
  },
  '.card-type-icon.amex': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.discover': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.jcb': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.dankort': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.cartebleue': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.diners': {
    top: 'calc(50% - 14px)',
  },
  '.card-type-icon.elo': {
    top: 'calc(50% - 14px)',
  },
}
