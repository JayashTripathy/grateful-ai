import Head from 'next/head'
import Navbar from '@/components/navbar'
import Form from '@/components/form'


export default function Home() {
  return (
    <>
      <Head>
        <title>Grateful AI</title>
        
      </Head>
      <main className="h-screen w-[100vw]  absolute top-0 left-0">
        <Navbar/>
        <div className=" relative block mx-auto w-4/5 h-[80%]">
          <Form/>
        </div>
        <div className='fixed top-0 left-0 z-[-10] bg-hero h-[100vh] w-[100vw] opacity-70 object-cover'></div>
      </main>
    </>
  )
}
