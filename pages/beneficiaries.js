import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import range from 'lodash/range'

import Nav from '../components/nav'
import { setBeneficiaries } from '../lib/redux/slices/subscription'

export default function Beneficiaries() {
  const router = useRouter()
  const dispatch = useDispatch()
  const plan = useSelector((state) => state.subscription.plan)
  const beneficiaries = range(+plan.productVersion)

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(
      setBeneficiaries(
        beneficiaries
          .filter((beneficiary) => event.target[`name-${beneficiary}`].value)
          .map((beneficiary) => ({
            name: event.target[`name-${beneficiary}`].value,
          }))
      )
    )

    router.push('/payment')
  }

  return (
    <>
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Afiliados a Tu Subscripción
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-5">
                {beneficiaries.map((beneficiary) => (
                  <div
                    key={`name-${beneficiary}`}
                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                  >
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      {beneficiary + 1}) Nombre de Afiliado
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        id={`name-${beneficiary}`}
                        type="text"
                        name={`name-${beneficiary}`}
                        autoComplete="name"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <Link href="/signup">
                <a className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Volver
                </a>
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continuar
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
