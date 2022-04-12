import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import axios from '../lib/axios'
import { setUserData } from '../lib/redux/slices/user'
import Nav from '../components/nav'
import styles from '../styles/payment.module.css'

export default function Payment() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const subscription = useSelector((state) => state.subscription)

  const addSubscriber = async (subscriptionID) => {
    setLoading(true)

    const res = await axios
      .post('/subscribers', {
        ...subscription.subscriber,
        beneficiary: subscription.beneficiaries,
        productCode: subscription.plan.productCode,
        subscriptionID,
      })
      .catch((err) => {
        console.error(err)

        setLoading(false)
      })

    const user = { ...res.data.users_permissions_user }
    const subscriber = { ...res.data }

    delete subscriber.users_permissions_user

    user.subscriber = subscriber

    dispatch(setUserData(user))

    router.push({
      pathname: '/profile',
    })
  }

  const onPaypalLoad = () => {
    setLoading(false)

    paypal
      .Buttons({
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            plan_id: 'P-1V566755XY045873BMJILIKY', // Creates the subscription
          })
        },
        onApprove: function (data, actions) {
          addSubscriber(data.subscriptionID)
        },
      })
      .render('#paypal-button-container')
  }

  useEffect(() => {
    if (isEmpty(subscription.plan) || isEmpty(subscription.subscriber))
      router.push('/signup')
  }, [])

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true&intent=subscription`}
        onLoad={onPaypalLoad}
      />
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información de Pago
          </h3>

          {loading && (
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
            className={clsx({ hidden: loading }, 'pt-8 sm:pt-5')}
          >
            <div id="paypal-button-container" />

            <div className="pt-5 flex justify-end">
              <Link href="/checkout">
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
