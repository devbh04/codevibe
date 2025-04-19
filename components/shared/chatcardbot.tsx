import React from 'react'

const ChatCardBot = ({comment}) => {
  return (
    <div className='bg-slate-800 p-4 rounded-lg mb-4'>
      <p>{comment}</p>
    </div>
  )
}

export default ChatCardBot