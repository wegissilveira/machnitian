import React from 'react'
import Layout from '../src/containers/Layout/Layout'

function App({ Component, pageProps }) {
   return (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   )
}

export default App