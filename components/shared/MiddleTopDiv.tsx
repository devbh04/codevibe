'use client';
import { Editor } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useCodeEditorStore from '@/store/codeEditorStore';
import useTestCasesStore from '@/store/testCasesStore';
import { Input } from '../ui/input';
import { useParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { BASE_URL } from '@/lib/url';

const MiddleTopDiv = () => {
  const [fontSize, setFontSize] = useState(16);
  const [editorValue, setEditorValue] = useState('// Initial code');
  const [key, setKey] = useState('');
  const [isWrongKey, setIsWrongKey] = useState(false);

  const {adminExplaination, setAdminExplaination, adminKey, setadminKey, setRunCount, runCount, setUserCode, userCode, setUseLanguage, useLanguage} = useCodeEditorStore();
  const { id } = useParams();
  const {setTestCases, setNewTestCases} = useTestCasesStore();
  const { testCases } = useTestCasesStore();

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/contests/${id}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch contest data');
        }
        const data = await response.json();
        setadminKey(data.key);
        setAdminExplaination(data.problemExplanation);
      } catch (err) {
        console.error('Error fetching contest data:', err);
      } finally {
        console.log('Fetch contest data completed');
      }
    };
    
    if (id) {
      fetchContestData();
    }
  }, [id, setTestCases]);
  
  const handleSubmit = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/gemini/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        userCode,
        testCases,
        key: adminKey,
        explanation: adminExplaination
      }),
    });
    
    if (!response.ok) throw new Error('Evaluation failed');
    
    const evaluationResults = await response.json();
    
    console.log('Evaluation Results:', evaluationResults);
    setNewTestCases(evaluationResults);
    console.log('Test Cases:', testCases);
  }

  const handleKeySubmit = () => {
    if (key === adminKey) {
      // Success - trigger confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#60a5fa', '#fbbf24']
      });
      console.log('Correct key submitted!');
      // Add your actual submission logic here
    } else {
      // Failure - trigger shake animation
      setIsWrongKey(true);
      setTimeout(() => setIsWrongKey(false), 500);
      console.log('Incorrect key');
    }
  };

  return (
    <div className="w-full h-5/6 flex flex-col">
        <div className="p-4 bg-slate-950 flex justify-between items-center">
            <p className='text-lg'>CodeVibe Code-Editor</p>
            <div className='flex gap-2 items-center'>
              <p>TextSize:</p>
              <Input className='w-20 h-8' type='number' value={fontSize} onChange={(e)=> setFontSize(Number(e.target.value))}/>
              <ComboboxDemo/>
            </div>
        </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={useLanguage}
          defaultValue={editorValue}
          theme="vs-dark"
          onChange={(value) => {setEditorValue(value); setUserCode(value); console.log(userCode)}}
          options={{
            automaticLayout: true,
            fontSize: fontSize,
          }}
        />
      </div>

      <div className="p-2 items-center flex gap-2 justify-center">
        <Button className='items-center bg-red-700 p-1 px-2 rounded-lg hover:bg-red-800'
          onClick={() => {
            setRunCount(runCount + 1);
            console.log(runCount);
            console.log(adminExplaination);
            console.log(adminKey);
            handleSubmit();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          Run
        </Button>
        <Input 
          placeholder='Enter the Key to Submit the Code' 
          className={`w-64 transition-all ${isWrongKey ? 'animate-shake border-red-500' : ''}`}
          onChange={(e)=> setKey(e.target.value)}
        />
        {key === '' ? (
          <Button className='items-center bg-slate-700 p-1 px-2 rounded-lg hover:bg-slate-800' disabled>Submit</Button>
        ) : (
          <Button 
            className={`items-center p-1 px-2 rounded-lg cursor-pointer bg-purple-600 ${isWrongKey ? 'animate-shake' : ''}`}
            onClick={handleKeySubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default MiddleTopDiv;

const languages = [
  {
    value: "javascript",
    label: "Javascript",
  },
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "c",
    label: "C",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "r",
    label: "R",
  },
]

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const { useLanguage, setUseLanguage } = useCodeEditorStore();
  const [value, setValue] = React.useState(useLanguage)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-purple-600 border-0 hover:bg-purple-400"
        >
          {value
            ? languages.find((framework) => framework.value === value)?.label
            : "Select language..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9 " />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {languages.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setUseLanguage(currentValue === value ? "" : currentValue)
                    console.log(currentValue === value ? "" : currentValue);
                    console.log(useLanguage);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}