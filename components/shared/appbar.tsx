import Link from 'next/link'
import React from 'react'

const AppBAr = () => {
  return (
    <div className='p-4 px-10 bg-slate-800 flex justify-between items-center'>
      <div className='flex items-center space-x-6'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
        <Link href={'/'} className='text-2xl font-extrabold'>CodeVibe</Link>
        <Link href={'/contest'} className='text-white'>Contest</Link>
        <Link href={'/discussion'} className='text-white'>Discussion</Link>
        <Link href={'/progress'} className='text-white'>Progress</Link>
      </div>
      <div className='flex items-center space-x-6'>
        <button className='text-white bg-purple-500 px-2 py-1 rounded-lg'>Premium</button>
        <button className='text-white bg-purple-500 p-2 rounded-full'>DB</button>
      </div>
    </div>
  )
}

export default AppBAr