import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setPlan } from '../lib/redux/slices/subscription'

import axios from '../lib/axios'
import Nav from '../components/nav'

export default function Plans() {
  const [plans, setPlans] = useState({
    data: null,
    error: false,
    loading: true,
  })

  const router = useRouter()
  const dispatch = useDispatch()

  const handleClickPlan = (plan) => () => {
    dispatch(
      setPlan({
        name: plan.Translations.ES.Name,
        productCode: plan.ProductCode,
        productVersion: plan.ProductVersion,
        description: plan.Translations.ES.Description,
      })
    )

    router.push({
      pathname: '/signup',
    })
  }

  useEffect(async () => {
    const res = await axios.get('/products').catch((err) => {
      console.error(err)

      setPlans((state) => ({
        ...state,
        error: err,
        loading: false,
      }))

      // TODO: show error notification
    })

    res.data.Items.forEach((item) => {
      item.Translations = item.Translations.reduce((tally, trans) => {
        tally[trans.Language] = trans

        return tally
      }, {})
    })

    setPlans((state) => ({
      ...state,
      loading: false,
      data: res.data.Items,
    }))
  }, [])

  return (
    <>
      <Nav />

      <main className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
              Pricing Plans
            </h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
          </div>

          {plans.loading ? (
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
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {plans.data.map((plan) => (
                <div
                  key={plan.ProductCode}
                  className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
                >
                  <div className="p-6">
                    <h2 className="text-lg leading-6 font-medium capitalize text-gray-900">
                      {plan.Translations.ES.Name}
                    </h2>
                    <div
                      className="mt-4 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: plan.Translations.ES.Description,
                      }}
                    />
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900">
                        Q
                        {plan.PricingConfigurations[0].Prices.Regular[0].Amount}
                      </span>{' '}
                      <span className="text-base font-medium text-gray-500">
                        /mes
                      </span>
                    </p>
                    <button
                      onClick={handleClickPlan(plan)}
                      className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center capitalize hover:bg-gray-900"
                    >
                      inscribite {plan.ProductName}
                    </button>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                      Que Incluye
                    </h3>
                    <div
                      className="mt-3"
                      dangerouslySetInnerHTML={{
                        __html: plan.Translations.ES.LongDescription,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
