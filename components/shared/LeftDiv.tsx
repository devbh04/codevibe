import React from 'react'
import LeftBelowDiv from './LeftBelowDiv'

const LeftDiv = ({ title, company, reward, description, difficulty, examples, testCases, shortdescription}) => {
  return (
    <div className='flex w-2/5 flex-col h-full'>
      <div className='p-4 bg-slate-900 h-full overflow-auto text-white'>
        <div className='flex justify-between items-center mt-4'>
          <p className='font-extrabold text-2xl'>{title}</p>
          <p className='bg-red-500 rounded-full py-1 px-2'>{difficulty}</p>
        </div>
        <div className='flex gap-2 mt-2 items-center'>
          <p>🏢 {company}</p>
        </div>
        <div className='flex gap-2 mt-2 items-center'>
          <p>💰 Reward: {reward}</p>
        </div>
        <div className='mt-8 p-4 border border-slate-700 rounded-lg'>
          <h1 className='text-xl'>Short Description</h1>
          <p>{shortdescription}</p>
        </div>
        <div className='mt-8 p-4 border border-slate-700 rounded-lg'>
          <h1 className='text-xl'>Explanation</h1>
          <p>{description}</p>
        </div>
        <div className='mt-8'>
          <h1 className='text-xl'>Examples</h1>
          {examples?.map((ex, idx) => (
            <div key={idx} className='mt-2 bg-slate-950 p-4 border border-slate-700 rounded-lg'>
              <p>Example {idx + 1}:</p>
              <p>Input: {ex.input}</p>
              <p>Output: {ex.output}</p>
              <p>Explanation: {ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className='mt-8'>
          <h1 className='text-xl'>Test Cases</h1>
          {testCases?.map((ex, idx) => (
            <div key={idx} className='mt-2 bg-slate-950 p-4 border border-slate-700 rounded-lg'>
              <p>TestCase {idx + 1}:</p>
              <p>Input: {ex.input}</p>
            </div>
          ))}
        </div>
      </div>
      <LeftBelowDiv/>
    </div>
  )
}

export default LeftDiv
