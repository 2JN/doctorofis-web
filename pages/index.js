import Head from 'next/head'

import Nav from '../components/nav'

export default function Home() {
  return (
    <>
      <Head>
        <title>DOCTOROFIS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
    </>
  )
}
