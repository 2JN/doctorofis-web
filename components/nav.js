import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                  <a
                    href="/"
                    className="border-indigo-500 text-gray-900 capitalize inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    quiénes somos
                  </a>
                  <a
                    href="/"
                    className="border-transparent text-gray-500 capitalize hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    nuestros servicios
                  </a>
                  <Link href="/login">
                    <a
                      href="/login"
                      className="border-transparent text-gray-500 capitalize hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      iniciar sesión
                    </a>
                  </Link>
                  <div className="py-3">
                    <Link href="/plans">
                      <a className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white capitalize bg-indigo-600 hover:bg-indigo-700">
                        crear cuenta
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 capitalize block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                aria-current="page"
              >
                quiénes somos
              </a>

              <a
                href="/"
                className="'border-transparent text-gray-600 capitalize hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'"
              >
                nuestros servicios
              </a>
            </div>
            <div className="pt-4 p-3 border-t border-gray-200">
              <Link href="/plans">
                <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base capitalize font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  crear cuenta
                </a>
              </Link>
              <p className="mt-2 text-center text-base font-medium text-gray-500">
                Ya estas registrado? &nbsp;
                <Link href="/login">
                  <a className="text-indigo-600 capitalize hover:text-indigo-500">
                    iniciar sesión
                  </a>
                </Link>
              </p>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
