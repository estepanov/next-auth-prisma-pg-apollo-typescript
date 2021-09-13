import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "next-auth/client";
import {
  ApolloProvider,
} from "@apollo/client";

import client from "apollo/client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}
export default MyApp
