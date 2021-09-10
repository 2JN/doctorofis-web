import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import axios from '../lib/axios'
import Nav from '../components/nav'
import { setUserData } from '../lib/redux/slices/user'

export default function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const subscription = useSelector((state) => state.subscription)

  useEffect(() => {
    if (
      isEmpty(subscription.plan) ||
      isEmpty(subscription.subscriber) ||
      !subscription.paymentCode
    )
      router.push('/payment')
    else setLoading(false)
  }, [])

  const addSubscriber = async () => {
    setLoading(true)

    const res = await axios
      .post('/subscribers', {
        ...subscription.subscriber,
        beneficiary: subscription.beneficiaries,
        eesToken: subscription.paymentCode,
        productCode: subscription.plan.productCode,
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

  return (
    <>
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tu Nuevo Plan
            </h3>
          </div>

          {loading ? (
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
          ) : (
            <>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                  Plan
                </h4>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Plan</dt>
                  <dd className="mt-1 text-sm capitalize text-gray-900">
                    {subscription.plan.name}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Description
                  </dt>
                  <dd
                    className="mt-1 text-sm text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: subscription.plan.description,
                    }}
                  />
                </div>
              </dl>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                  Beneficiarios
                </h4>

                {subscription.beneficiaries.map(({ name }, i) => (
                  <div key={i} className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500"></dt>
                    <dd className="mt-1 text-sm capitalize text-gray-900">
                      {name}
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                  Información Personal
                </h4>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Subscriptor
                  </dt>
                  <dd className="mt-1 text-sm capitalize text-gray-900">
                    {subscription.subscriber.firstName}{' '}
                    {subscription.subscriber.lastName}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.email}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Dirección
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.address}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Ciudad</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.city}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Departamento
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.state.name}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Código postal/ZIP
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.zip}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Teléfono
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.phone}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Teléfono 2
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subscription.subscriber.phone2}
                  </dd>
                </div>
              </dl>

              <div className="pt-5 flex justify-end">
                <Link href="/payment">
                  <a className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Volver
                  </a>
                </Link>
                <button
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={addSubscriber}
                >
                  Suscribirme
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
