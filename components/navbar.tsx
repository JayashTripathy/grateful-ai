import React from 'react'
import {SiGithub} from 'react-icons/si'

function navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white px-6 py-3 text-black shadow">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
               <div className="font-semibold text-3xl  ">Grateful.<span className='font-extrabold text-purple-950' >AI</span></div>
            </div>

            <div className='bg-black text-white px-5 py-3 rounded-xl flex items-center justify-center gap-3'>
              <div className="font-bold ">Give a star on </div>
                <SiGithub size="25" />
            </div>
          
        </nav>
    )
}

export default navbar