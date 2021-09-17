import type { NextPage } from 'next'
import Link from "next/link"
import { useSession } from 'next-auth/client';
import PublicMessageList from "components/PublicMessageList"
import CreatePublicMessage from 'components/CreatePublicMessage';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Home: NextPage = () => {
  const [session] = useSession()
  return (
    <>
      <Header />
      <div className="bg-gradient-to-l from-green-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <div className="mb-24">
            <h1 className="text-6xl font-extrabold text-white tracking-tight">
              My highly opinionated boilerplate
            </h1>
            <p className="mt-4 max-w-3xl text-4xl text-green-200">
              A modern fullstack Next.js boilerplate filled with more than you need to hit the ground running.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">TypeScript</h3>
                <p className="mt-2 text-base text-purple-200">
                  Because you care about developer ergonomics
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Next.js</h3>
                <p className="mt-2 text-base text-purple-200">
                  Server side rendering (SSR) React has never been so easy or fun
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Authentication</h3>
                <p className="mt-2 text-base text-purple-200">
                  Fullstack auth ready to go. Use passwordless or OAuth strategies powered by <a href="https://next-auth.js.org/" target="_blank">next-auth</a>
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Prisma with PostgreSQL</h3>
                <p className="mt-2 text-base text-purple-200">
                  A type-safe ORM configured to use a PostgreSQL database.
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Apollo Server <span className="font-thin">&</span> Apollo Client</h3>
                <p className="mt-2 text-base text-purple-200">
                  Apollo server on the backend and apollo client on the frontend
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Tailwind CSS</h3>
                <p className="mt-2 text-base text-purple-200">
                  Build faster and ship style changes with confidence.
                </p>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white">Dev Tools</h3>
                <p className="mt-2 text-base text-purple-200">
                  Wired up to configure the best VSCode experience: ESLint, Prettier, Apollo, and Tailwind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            <span className="block text-blue-600">Start your project</span>
            <span className="block">Checkout the code on GitHub</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href="https://github.com/estepanov/next-auth-prisma-pg-apollo-typescript" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                GitHub
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <Link passHref href="/docs">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 dark:text-blue-100 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800" >
                  Documentation
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-green-100 dark:from-green-900 to-gray-100 dark:to-gray-900">
        <main className="max-w-4xl mx-auto lg:max-w-7xl px-8 sm:px-6 sm:pt-20 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-20 py-24">
            <div className="text-xl">
              <div className="text-right sticky top-16 sm:top-24">
                <h3 className="text-green-900 dark:text-green-100 font-extrabold text-3xl mb-8">
                  Message board example
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  This is a fully functioning example of a fullstack feature.
                  This simple message example allows unauthenticated users to view messages, but restricts posting to authenticated users.
                </p>
                {!session && <a href="/api/auth/signin" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-700">
                  Sign in
                </a>}
              </div>
            </div>
            <div>
              <div className="pb-8 rounded-2xl">
                {session ? (
                  <div className="py-2 ">
                    <CreatePublicMessage />
                  </div>
                ) : (
                  <div className="bg-yellow-200 text-yellow-900 p-10 rounded-2xl">
                    You must sign in to post
                  </div>
                )}
              </div>
              <div className="bg-green-100 dark:bg-green-800 p-10 rounded-2xl ">
                <PublicMessageList />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
