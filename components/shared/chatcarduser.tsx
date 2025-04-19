import React from 'react'

const ChatCardUser = ({comment}) => {
  return (
    <div className='bg-slate-700 p-4 rounded-lg mb-4'>
        <p>{comment}</p>
    </div>
  )
}

export default ChatCardUser