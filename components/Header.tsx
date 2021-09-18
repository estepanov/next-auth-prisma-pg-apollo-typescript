import { signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link'
import Head from 'next/head'
import { Fragment, useCallback, useMemo, useState } from "react";
import CryptoJS from 'crypto-js'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const NAVIGATION_ITEMS = [
  { name: "Documentation", href: "/docs" }
]

const USER_NAVIGATION_ITEMS = [
  { name: "Settings", href: "/docs#" }
]

const UserMenu = ({ gravatarURL }: { gravatarURL: string }) => {
  const [session] = useSession();
  const [showMenu, setShowMenu] = useState(false)
  const toggle = useCallback(() => setShowMenu(v => !v), [setShowMenu])

  return (
    <>
      <button onClick={toggle} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span className="sr-only">{session?.user?.email ?? session?.user?.name}</span>
        <img className="h-8 w-8 rounded-full" src={gravatarURL} alt="" />
      </button>
      {showMenu && <div className="text-black origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
        <div className="px-4 py-3" role="none">
          <p className="text-sm" role="none">
            Signed in as
          </p>
          <p className="text-sm font-medium text-gray-900 truncate" role="none">
            {session?.user?.email ?? session?.user?.name}
          </p>
        </div>
        <div className="py-1" role="none">
          <Link passHref href="/">
            <a className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Account settings</a>
          </Link>
        </div>
        <div className="py-1" role="none">
          <form method="POST" action="#" role="none">
            <button onClick={() => signOut} type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" id="menu-item-3">
              Sign out
            </button>
          </form>
        </div>
      </div>}
    </>
  )
}

const Header = () => {
  const [session, loading] = useSession();
  const imgHash = useMemo(() => {
    if (session && session.user && session.user.email) {
      return CryptoJS.MD5(session.user.email)
    }
    return ""
  }, [session])
  const gravatarURL = useMemo(() => `https://www.gravatar.com/avatar/${imgHash}?d=identicon`, [imgHash])

  return <>
    <Head>
      <title>Awesome Next Boilerplate</title>
      <meta name="description" content="Awesome next app" />
      <meta name="color-scheme" content="dark light" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    {/* {loading && <div className="bg-black text-white py-2 px-3">
      checking user session...
    </div>} */}
    <Disclosure as="nav" className="bg-white dark:bg-black text-black dark:text-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            { /* desktop navbar */}
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link passHref href="/">
                    <a className="font-bold text-lg">Awesome Boilerplate</a>
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Link passHref href={item.href} key={`${item.href}/${item.name}`}>
                      <a
                        key={item.name}
                        className='border-transparent text-gray-600 dark:text-gray-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                {session && <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white dark:bg-gray-900 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={gravatarURL} alt="" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none">
                      {USER_NAVIGATION_ITEMS.map((item) => (
                        <Menu.Item key={item.name}>
                          <Link href={item.href} passHref>
                            <a
                              className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                            >
                              {item.name}
                            </a>
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>}
                {!session && <button className="py-1 bg-white dark:bg-white text-black dark:text-black text-xs px-3 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white rounded-full" type="button" onClick={() => signIn()}>Sign in</button>}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white dark:bg-black inline-flex items-center justify-center p-2 rounded-md text-gray-500  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
              {NAVIGATION_ITEMS.map((item) => (
                <Link href={item.href} passHref key={`${item.href}/${item.name}`}>
                  <a
                    key={item.name}
                    className='border-transparent text-gray-600 dark:text-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            {session && <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={gravatarURL} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200">{session?.user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {USER_NAVIGATION_ITEMS.map((item) => (
                  <Link passHref href={item.href} key={`${item.href}/${item.name}`}>
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-400"
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>}
            {!session && <button className="py-1 bg-black dark:bg-white text-white dark:text-black text-xs px-3 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black dark:focus:ring-offset-black dark:focus:ring-white focus:ring-white rounded-full" type="button" onClick={() => signIn()}>Sign in</button>}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </>
}

export default Header