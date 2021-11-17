import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { MenuAlt2Icon, UserIcon, LogoutIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

import { logOutUser } from '../lib/redux/slices/user'
import styles from '../styles/sidebar.module.css'

const paths = {
  profile: '/profile',
}

export default function Sidebar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSideBar = () => {
    setIsExpanded((state) => !state)
  }

  const logout = () => {
    localStorage.removeItem('auth-token')

    dispatch(logOutUser())

    router.replace({
      pathname: '/',
    })
  }

  return (
    <aside
      className={clsx(
        styles.sidebar,
        'min-h-screen border-r border-gray-200 flex flex-col bg-white'
      )}
    >
      <button
        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
        onClick={toggleSideBar}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <nav className="mt-5 px-2 flex-1">
        <a
          href="/profile"
          className={clsx(
            router.pathname === paths.profile
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'px-2 py-2 group flex items-center text-sm font-medium rounded-md'
          )}
        >
          <UserIcon
            className={clsx(
              router.pathname === paths.profile
                ? 'text-gray-500'
                : 'text-gray-400 group-hover:text-gray-500',
              'h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          {isExpanded && <span className="ml-3">Perfil</span>}
        </a>
      </nav>
      <div className="px-2 pb-2">
        <button
          onClick={logout}
          className="px-2 py-2 text-gray-600 group flex items-center text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900"
        >
          <LogoutIcon className="h-6 w-6 flex-shrink-0" />
          {isExpanded && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  )
}
