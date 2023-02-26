import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import TopNav from '@/components/TopNav'
import Hero from '@/components/Hero'
import WhyMerit from '@/components/WhyMerit'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Merit</title>
        <meta name="description" content="Merit  Dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" bg-purple-100">
         <TopNav   />
          <Hero   />
          <WhyMerit  />

      </main>
    </>
  )
}
