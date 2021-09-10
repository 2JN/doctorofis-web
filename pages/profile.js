import Head from 'next/head'

import Sidebar from '../components/sidebar'
import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector((state) => state.user)
  const { subscriber } = user.data

  return (
    <>
      <Head>
        <title>DOCTOROFIS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user.loading ? (
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
        <main className="flex">
          <Sidebar />

          <section className="py-2 px-4">
            <h1 className="text-lg font-semibold">Perfil</h1>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                Información Personal
              </h4>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                <dd className="mt-1 text-sm capitalize text-gray-900">
                  {subscriber?.firstName} {subscriber?.lastName}
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm capitalize text-gray-900">
                  {user.data.email}
                </dd>
              </div>

              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Tipo de Plan
                </dt>
                <dd className="mt-1 text-sm capitalize text-gray-900">
                  PENDING
                </dd>
              </div>
            </dl>
          </section>
        </main>
      )}
    </>
  )
}
