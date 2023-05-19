import Link from 'next/link'
import React from 'react'
import {SiGithub} from 'react-icons/si'

function navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap  px-6 py-3 text-white shadow md:w-2/3 rounded-full
         mx-auto mt-10">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
               <div className="font-semibold text-2xl md:text-3xl  ">Grateful.<span className='font-extrabold'>AI💙</span></div>
            </div>

            <Link href="https://github.com/JayashTripathy/grateful-ai" className=' bg-gray-900 text-white px-5 py-3 rounded-full  flex items-center justify-center gap-3 '>
              <div className="font-bold hidden md:visible">Give a star on </div>
                <SiGithub size="25" />
            </Link>
          
        </nav>
    )
}

export default navbar