'use client'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from '../ui/input'
import useCodeEditorStore from '@/store/codeEditorStore'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const LeftBelowDiv = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [userUnderstanding, setUserUnderstanding] = useState('');
    const [userText, setUserText] = useState('');
    const { adminExplaination } = useCodeEditorStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSelect = (value) => {
        setUserUnderstanding(value);
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://5a38-2405-201-1018-4093-b565-43f9-9ed7-9f6a.ngrok-free.app/api/v1/gemini/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    userUnderstanding,
                    userText,
                    explanation: adminExplaination
                }),
            });

            if (!response.ok) throw new Error('Failed to get recommendations');

            const data = await response.json();
            setRecommendations(data.recommendations || []);

        } catch (err) {
            setError(err.message || 'Failed to load recommendations');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }

    const openVideoDialog = (video) => {
        setSelectedVideo(video);
        setIsDialogOpen(true);
    }

    return (
        <div className='p-4 h-96 bg-slate-900 border-t border-slate-700 overflow-auto text-white'>
            <h1 className='text-2xl mb-4 text-center'>Content Recommendation:</h1>
            <div className='flex justify-between items-center'>
                <ComboboxDemo select={handleSelect} />
                <Button
                    className='bg-green-700 hover:bg-green-600'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        'Searching...'
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            Search
                        </>
                    )}
                </Button>
            </div>
            <div>

                <p className='mt-4'>Any specific thing you are looking for (Optional): </p>
                <Input
                    className='mt-2 bg-slate-800 border-0 hover:bg-slate-600'
                    placeholder='Enter your content...'
                    type='text'
                    onChange={(e) => setUserText(e.target.value)}
                    value={userText}
                />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {recommendations.length > 0 && (
                <div className='mt-4'>
                    <h1 className='text-xl'>Recommended Content:</h1>
                    <div className="space-y-4 mt-4">
                        {recommendations.map((video, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-center bg-slate-950 p-4 border border-slate-700 rounded-lg hover:bg-slate-800 cursor-pointer"
                                onClick={() => openVideoDialog(video)}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        className="h-24 w-40 object-cover rounded"
                                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                        alt={video.title}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium">{video.title}</h3>
                                    <p className="text-sm text-slate-400">{video.channel}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Video Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[800px] bg-slate-900 border-slate-700">
                    <DialogHeader>
                        <DialogTitle>{selectedVideo?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedVideo && (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-[450px]"
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeftBelowDiv

const hardness = [
    {
      value: "newbie",
      label: "Newbie",
    },
    {
      value: "verybasic",
      label: "Very Basic",
    },
    {
      value: "basic",
      label: "Basic",
    },
    {
      value: "intermediate",
      label: "Intermediate",
    },
    {
      value: "advanced",
      label: "Advanced",
    },
  ]
  
  function ComboboxDemo({select}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between bg-slate-800 border-0 hover:bg-slate-600"
          >
            {value
              ? hardness.find((framework) => framework.value === value)?.label
              : "Select your understanding level..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {hardness.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      select(currentValue)
                      console.log('Selected value:', currentValue);
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