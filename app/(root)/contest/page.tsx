'use client';
import ContestCard from '@/components/shared/contestcard'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"  
import { Textarea } from '@/components/ui/textarea'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { BASE_URL } from '@/lib/url';
import useUserStore from "@/store/userStore"; // Adjust the path as needed

const Constest = () => {
  const [numExamples, setNumExamples] = React.useState(1);
  const [numTestcases, setNumTestcases] = React.useState(1);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUserStore();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    reward: '',
    shortDescription: '',
    problemExplanation: '',
    difficulty: '',
    contestDate: '',
    testCases: [],
    examples: [],
    key: '',
  });  

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/contests`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }});
        if (!response.ok) {
          throw new Error('Failed to fetch contests');
        }
        const data = await response.json();
        setContests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleCreateContest = async () => {
    try {
      console.log("Sending:", JSON.stringify(formData, null, 2));
      const response = await fetch(`${BASE_URL}/api/v1/contests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' // Add this line
 },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (!response.ok) throw new Error(data.message || 'Failed to create contest');
  
      setContests(prev => [data, ...prev]);
    } catch (err) {
      console.error("Create Contest Error:", err);
      setError(err.message);
    }
  };
  

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div>Loading contests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=''>
        <div className='flex justify-between items-center mt-10 mb-10 mx-[450px]'>
            <h1 className='text-3xl'>Coding Contests</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-400 hover:text-black border border-slate-100'>Create Contest</Button>
              </DialogTrigger>
              <DialogContent className="overflow-auto sm:max-w-[1000px] sm:max-h-[800px] bg-slate-900 border-slate-800">
                <DialogHeader>
                  <div className='flex justify-between pr-10'>
                    <div className=''>
                      <DialogTitle>Create a Contest</DialogTitle>
                      <DialogDescription>
                        Add the details of the contest you want to create.
                      </DialogDescription>
                    </div>
                    <Button 
                      type="submit" 
                      className='bg-purple-500 hover:bg-purple-400 cursor-pointer'
                      onClick={handleCreateContest}
                      disabled={!user}
                      >
                      Add it!!
                    </Button>
                  </div>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input className="col-span-3" onChange={(e) => handleInputChange('title', e.target.value)}/>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Company
                    </Label>
                    <Input className="col-span-3" onChange={(e) => handleInputChange('company', e.target.value)}/>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Reward
                    </Label>
                    <Input className="col-span-3" onChange={(e) => handleInputChange('reward', e.target.value)}/>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Short Description
                    </Label>
                    <Textarea 
                      id="description" 
                      className="col-span-3"
                      required
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 col-span-2 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Explaination of the problem
                    </Label>
                    <Textarea 
                      id="description" 
                      className="col-span-3"
                      required
                      onChange={(e) => handleInputChange('problemExplanation', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Difficulty
                    </Label>
                    <ComboboxDemo onSelect={(val) => handleInputChange('difficulty', val)}/>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Date
                    </Label>
                    <DatePickerDemo onSelectDate={(date) => handleInputChange('contestDate', date)}/>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <div className='grid grid-cols-2 items-center gap-4'>
                        <Label htmlFor="description" className="w-36">
                          No. of Testcases
                        </Label>
                        <Input type="number" 
                              fieldName="testcases"
                              className="col-span-3"
                              onChange={(e) => setNumTestcases(parseInt(e.target.value) || 0)}/>
                      </div>
                      <div className='grid grid-cols-2 items-center gap-4'>
                        <Label htmlFor="description" className="w-36">
                          No. of Examples
                        </Label>
                        <Input 
                          type="number" 
                          fieldName="examples" 
                          className="col-span-3"
                          onChange={(e) => setNumExamples(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 col-span-3 items-center gap-4">
                    <div>

                    </div>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor="description" className="flex justify-center text-xl">
                        Key To Solve The Question!!
                      </Label>
                      <Input className="h-14" onChange={(e) => handleInputChange('key', e.target.value)}/>
                    </div>
                    <div>

                    </div>
                  </div>
                  <div className="grid col-span-3 items-center gap-4">
                    <div className='grid grid-cols-5 gap-4'>
                    {[...Array(numTestcases)].map((_, index) => (
                      <div key={index} className="grid grid-cols-1 items-center gap-4">
                        <Label className="w-36">Testcase {index + 1}</Label>
                        <div className="grid grid-cols-1 gap-2">
                          <Input type="text" placeholder="Input" onChange={(e) => {
                            const updated = [...formData.testCases];
                            if (!updated[index]) updated[index] = { input: "", output: "" };
                            updated[index].input = e.target.value;
                            handleInputChange('testCases', updated);
                          }} />
                          <Input type="text" placeholder="Output" onChange={(e) => {
                            const updated = [...formData.testCases];
                            if (!updated[index]) updated[index] = { input: "", output: "" };
                            updated[index].output = e.target.value;
                            handleInputChange('testCases', updated);
                          }} />
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                  <div className="grid col-span-3 items-center gap-4">
                    <div className='grid grid-cols-5 gap-4'>
                      {[...Array(numExamples)].map((_, index) => (
                        <div key={index} className="grid grid-cols-1 items-center gap-4">
                          <Label className="w-36">Example {index + 1}</Label>
                          <div className="grid grid-cols-1 gap-2">
                            <Input placeholder="Input" onChange={(e) => {
                              const updated = [...formData.examples];
                              if (!updated[index]) updated[index] = { input: "", output: "", explanation: ""};
                              updated[index].input = e.target.value;
                              handleInputChange('examples', updated);
                            }} />
                            <Input placeholder="Output" onChange={(e) => {
                              const updated = [...formData.examples];
                              if (!updated[index]) updated[index] = { input: "", output: "", explanation: ""};
                              updated[index].output = e.target.value;
                              handleInputChange('examples', updated);
                            }} />
                            <Textarea placeholder="Explaination" onChange={(e) => {
                              const updated = [...formData.examples];
                              if (!updated[index]) updated[index] = { input: "", output: "", explanation: ""};
                              updated[index].explanation = e.target.value;
                              handleInputChange('examples', updated);
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
        </div>
        <div>
          {contests.map((contest) => (
            <ContestCard 
              key={contest._id}
              id={contest._id}
              title={contest.title}
              company={contest.company}
              reward={contest.reward}
              shortdescription={contest.shortDescription}
              datecreated={new Date(contest.createdAt).toLocaleDateString()}
              difficulty={contest.difficulty}
            />
          ))}
        </div>
    </div>
  )
}

export default Constest

const toughness = [
  { value: "Hard", label: "Hard" },
  { value: "Medium", label: "Medium" },
  { value: "Easy", label: "Easy" },
];

function ComboboxDemo({ onSelect }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-tansparent border hover:bg-transparent hover:text-white"
        >
          {value
            ? toughness.find((difficulty) => difficulty.value === value)?.label
            : "Select Difficulty..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {toughness.map((difficulty) => (
                <CommandItem
                  key={difficulty.value}
                  value={difficulty.value}
                  onSelect={() => {
                    setValue(difficulty.value);
                    onSelect(difficulty.value);
                    setOpen(false);
                  }}
                >
                  {difficulty.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === difficulty.value ? "opacity-100" : "opacity-0"
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

function DatePickerDemo({ onSelectDate }) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent text-white border hover:bg-transparent hover:text-white",
            !date
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            onSelectDate(selectedDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
