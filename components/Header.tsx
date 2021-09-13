import { signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link'
import Head from 'next/head'
import { useCallback, useMemo, useState } from "react";
import CryptoJS from 'crypto-js'

const UserMenu = () => {
  const [session] = useSession();
  const [showMenu, setShowMenu] = useState(false)
  const toggle = useCallback(() => setShowMenu(v => !v), [setShowMenu])
  const imgHash = useMemo(() => {
    if (session && session.user && session.user.email) {
      return CryptoJS.MD5(session.user.email)
    }
    return ""
  }, [session])
  return (
    <>
      <button onClick={toggle} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span className="sr-only">{session?.user?.email ?? session?.user?.name}</span>
        <img className="h-8 w-8 rounded-full" src={`https://www.gravatar.com/avatar/${imgHash}?d=identicon`} alt="" />
      </button>
      {showMenu && <div className="text-black origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
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
            <a className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
          </Link>
        </div>
        <div className="py-1" role="none">
          <form method="POST" action="#" role="none">
            <button onClick={() => signOut} type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
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

  return <>
    <Head>
      <title>Awesome Next Boilerplate</title>
      <meta name="description" content="Awesome next app" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    {loading && <div className="bg-black text-white py-2 px-3">
      checking user session...
    </div>}
    <div className="bg-black text-white flex flex-row py-2 px-4">
      <div className="flex-1 flex justify-center items-center">
        <Link passHref href="/">
          <a className="font-bold text-lg">Awesome Boilerplate</a>
        </Link>
      </div>
      <div className="relative">
        {session ? <UserMenu /> : <>
          <button className="py-1 bg-white text-black text-xs px-2 uppercase" type="button" onClick={() => signIn()}>Sign in</button>
        </>}
      </div>
    </div>
  </>
}

export default Header