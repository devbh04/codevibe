// AppBar.js
'use client'
import useUserStore from '@/store/userStore';
import Link from 'next/link'
import React, { useEffect } from 'react'


const AppBAr = () => {
  const { user, logout, initialize } = useUserStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return (
    <div className='p-4 px-10 bg-slate-900 flex justify-between items-center'>
      <div className='flex items-center space-x-6'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
        <Link href={'/'} className='text-2xl font-extrabold'>CodeVibe</Link>
        <Link href={'/contest'} className='text-white'>Contest</Link>
        <Link href={'/discussion'} className='text-white'>Discussion</Link>
        <Link href={'/progress'} className='text-white'>Progress</Link>
      </div>

      {user ?
            <div className='flex items-center space-x-6'>
              <button onClick={logout} className='text-white bg-purple-500 p-2 rounded-lg'>Logout</button>
              <p className='text-white p-2 rounded-full'>Hello!! {user.name}</p>
            </div>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        }
    </div>
  )
}

export default AppBAr