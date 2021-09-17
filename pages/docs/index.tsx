import type { NextPage } from 'next'
import Link from 'next/link'
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBar from 'components/docs/SideBar';

const DocsHome: NextPage = () => {
  // const [session] = useSession()
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-4 sm:pt-4 lg:max-w-7xl grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
        {/* NAV SIDE BAR */}
        <SideBar />
        {/* MAIN CONTENT */}
        <div className="">
          docs content
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DocsHome
