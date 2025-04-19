import React from 'react';
import { Button } from '../ui/button';
import useTestCasesStore from '@/store/testCasesStore';

const MiddleBottomDiv = () => {
  const { 
    newTestCases,
    testCases, 
    selectedTestCase, 
    setSelectedTestCase 
  } = useTestCasesStore();

  if (!newTestCases || newTestCases.length === 0) {
    return (
      <div className={'w-full bg-slate-800 h-1/6 flex flex-col'}>
        <div className='bg-slate-900 p-2'>
          <p>No test cases available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={'w-full bg-slate-800 h-1/6 flex flex-col'}>
      <div className='bg-slate-900 p-2 flex gap-2 items-center overflow-x-auto'>
        <p>TestCases: </p>
        {newTestCases.map((testCase, index) => (
          <Button 
            key={index}
            className={`p-1 px-2 rounded-lg hover:bg-slate-800 
              ${
                testCase.result === 'Passed' ? 'bg-green-700' : 'bg-red-600'
              }
              ${
              selectedTestCase === index && (testCase.result === 'Passed'?'bg-green-400' : 'bg-red-400')
              }
            `}
            onClick={() => setSelectedTestCase(index)}
          >
            Case {index + 1}
          </Button>
        ))}
      </div>
      <div className='overflow-auto flex-1 px-2 pt-2'>
        {newTestCases[selectedTestCase] && (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
              <p>Input:</p>
              <p className='font-mono'>{newTestCases[selectedTestCase].input}</p>
            </div>
            {
              newTestCases[selectedTestCase].result === 'Passed' ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                    <p>Key:</p>
                    <p className='font-mono'>{newTestCases[selectedTestCase].key}</p>
                  </div>
                  <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                    <p>Testcase Result:</p>
                    <p className='font-mono'>{newTestCases[selectedTestCase].result}</p>
                  </div>
                  <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                    <p>Expected Output:</p>
                    <p className='font-mono'>{newTestCases[selectedTestCase].output}</p>
                  </div>
                  {
                    newTestCases[selectedTestCase].confirmation && (
                      <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                        <p>Confirmation:</p>
                        <p className='font-mono'>{newTestCases[selectedTestCase].confirmation}</p>
                      </div>
                    )
                  }
                </div>
              ) : (
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                      <p>Expected Output:</p>
                      <p className='font-mono'>{newTestCases[selectedTestCase].output}</p>
                    </div>
                    {
                      newTestCases[selectedTestCase].mistake && (
                        <div className='flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-950'>
                          <p>Mistake:</p>
                          <p className='font-mono'>{newTestCases[selectedTestCase].mistake}</p>
                        </div>
                      )
                    }
                  </div>
                )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default MiddleBottomDiv;