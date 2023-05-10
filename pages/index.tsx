import Head from 'next/head'
import Navbar from '@/components/navbar'


export default function Home() {
  return (
    <>
      <Head>
        <title>Grateful AI</title>
        
      </Head>
      <main className="h-[calc(100vh-16px)] w-[100vw] ">
        <Navbar/>
        <div className=' text-emerald-900 '>hey next</div>
        <div className='fixed top-0 left-0 z-[-9] bg-purple-300 h-[100vh] w-[100vw]  opacity-5 object-cover'></div>
        <div className='fixed top-0 left-0 z-[-10] bg-hero h-[100vh] w-[100vw] opacity-5 object-cover'></div>
      </main>
    </>
  )
}
