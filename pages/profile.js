import { useState } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { PencilAltIcon } from '@heroicons/react/outline'

import axios from '../lib/axios'
import Sidebar from '../components/sidebar'
import styles from '../styles/profile.module.css'
import { setUserLoad, setUserData } from '../lib/redux/slices/user'

export default function Profile() {
  const dispatch = useDispatch()
  const [isEditing, setEditing] = useState(false)

  const user = useSelector((state) => state.user)
  const { subscriber } = user.data

  const toggleEdition = () => {
    setEditing((value) => !value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setUserLoad(true))
    const [firstName, lastName] = e.target.name.value.split(' ')

    axios
      .put(`/subscribers/${subscriber.id}`, {
        firstName,
        lastName,
      })
      .then((res) => {
        dispatch(
          setUserData({
            ...user.data,
            subscriber: res.data,
          })
        )
      })

    toggleEdition()
  }

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

          <section className={styles.profileContainer}>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border-b border-gray-300 pb-3">
                <h1 className="text-lg font-semibold">Perfil</h1>

                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="ml-auto px-2 pb-0.5"
                      onClick={toggleEdition}
                    >
                      Cancel
                    </button>

                    <button type="submit" class="ml-2 pb-0.5">
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    class="ml-auto px-0.5"
                    onClick={toggleEdition}
                  >
                    <PencilAltIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                )}
              </div>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                  Información Personal
                </h4>

                {isEditing ? (
                  <>
                    <div>
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={`${subscriber?.firstName} ${subscriber?.lastName}`}
                      />
                    </div>

                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={`${user.data.email}`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <dt>Nombre</dt>
                      <dd>
                        {subscriber?.firstName} {subscriber?.lastName}
                      </dd>
                    </div>

                    <div>
                      <dt>Email</dt>
                      <dd>{user.data.email}</dd>
                    </div>

                    <div>
                      <dt>Tipo de Plan</dt>
                      <dd>PENDING</dd>
                    </div>
                  </>
                )}

                <h4 className="mt-8 text-md text-gray-500 sm:mt-5 sm:col-span-2">
                  Beneficiarios
                </h4>

                {subscriber?.beneficiary?.forEach((beneficiary) => (
                  <div>
                    <dt>Nombre</dt>
                    <dd>
                      {beneficiary?.firstName} {beneficiary?.lastName}
                    </dd>
                  </div>
                ))}
              </dl>
            </form>
          </section>
        </main>
      )}
    </>
  )
}
