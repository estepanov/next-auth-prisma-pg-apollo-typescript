import type { NextPage } from 'next'
import { useSession } from 'next-auth/client';
import PublicMessageList from "components/PublicMessageList"
import CreatePublicMessage from 'components/CreatePublicMessage';
import Header from 'components/Header';

const Home: NextPage = () => {
  const [session] = useSession()
  return (
    <>
      <Header />
      <main className="p-2">
        <h1 className="text-4xl font-extrabold">
          Welcome to the most awesome Next Boilerplate
        </h1>

        <ul className="list-disc">
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
    </>
  )
}

export default Home
