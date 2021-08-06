import Head from 'next/head'

import Sidebar from '../components/sidebar'

export default function Profile() {
  return (
    <>
      <Head>
        <title>DOCTOROFIS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main class="flex">
        <Sidebar />

        <section>
          <h1>Profile</h1>
        </section>
      </main>
    </>
  )
}
