import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, signOut, useSession } from "next-auth/client";
import PublicMessageList from "../components/PublicMessageList"
import CreatePublicMessage from '../components/CreatePublicMessage';

const Home: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>Awesome Next Boilerplate</title>
        <meta name="description" content="Awesome next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {loading && <div className="bg-black text-white py-2 px-3">
        checking user session...
      </div>}
      {session ? <div className="bg-blue-700 text-white py-2 px-3">
        <p>
          Welcome back {session?.user?.email ?? session?.user?.name}
          <span className="ml-4" />
          <button className="py-1 bg-white text-blue-700 text-sm px-2 uppercase" type="button" onClick={() => signOut()}>Sign out</button>
        </p>
      </div> : <div className="bg-blue-200 text-black py-2 px-3">
        <p>
          Not logged in
          <span className="ml-4" />
          <button className="py-1 bg-white text-blue-700 text-sm px-2 uppercase" type="button" onClick={() => signIn()}>Sign in</button>
        </p>
      </div>}
      <main className="p-2">
        <h1>
          Welcome to an awesome Next Boilerplate
        </h1>

        <ul>
          <li>TypeScript</li>
          <li>nextjs</li>
          <li>next-auth</li>
          <li>apollo-server (via apollo-server-micro)</li>
          <li>apollo-client</li>
          <li>VS Code workspace configuration</li>
          <li>eslint</li>
          <li>prettier</li>
        </ul>
        <div className="max-w-md py-4">
          <div className="py-2">
            <p className="text-gray-900 text-md font-semibold">
              Public Messages
            </p>
            {session ? (
              <div className="py-2">
                <CreatePublicMessage />
              </div>
            ) : (
              <div className="bg-yellow-200 p-4">
                Sign in or sign up to post a message
              </div>
            )}
            <div className="py-2">
              <PublicMessageList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
