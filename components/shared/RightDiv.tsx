'use client'
import React, { useEffect, useState } from 'react'
import { Textarea } from '../ui/textarea'
import ChatCardBot from './chatcardbot'
import ChatCardUser from './chatcarduser'
import { Button } from '../ui/button'
import useTestCasesStore from '@/store/testCasesStore'
import useCodeEditorStore from '@/store/codeEditorStore'
import { BASE_URL } from '@/lib/url'

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const RightDiv = () => {
    const [userText, setUserText] = useState('')
    const { adminExplaination, userCode } = useCodeEditorStore();
    const { setNewTestCases } = useTestCasesStore();
    const { testCases } = useTestCasesStore();
    const [chatArray, setChatArray] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Add initial bot message
    useEffect(() => {
      if (chatArray.length === 0) {
        setChatArray([{
          id: '1',
          sender: 'bot',
          text: "Hello! I'm here to help you with your coding problem. Feel free to ask me anything about the problem or your code.",
          timestamp: new Date()
        }]);
      }
    }, []);

    const handleSubmit = async () => {
        if (!userText.trim()) return;
        
        try {
            setLoading(true);
            setError(null);
            
            // Add user message to chat
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'user',
                text: userText,
                timestamp: new Date()
            };
            setChatArray(prev => [...prev, userMessage]);
            setUserText('');
            
            const response = await fetch(`${BASE_URL}/api/v1/gemini/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
              },
              body: JSON.stringify({
                userText,
                userCode,
                testCases,
                explanation: adminExplaination
              }),
            });
        
            if (!response.ok) throw new Error('Failed to get response from server');
    
            const data = await response.json();
            
            // Add bot response to chat
            const botMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'bot',
                text: data.response || "I couldn't process your request. Please try again.",
                timestamp: new Date()
            };
            setChatArray(prev => [...prev, botMessage]);
            
            // If the response includes test cases, update the store
            if (data.testCases) {
                setNewTestCases(data.testCases);
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
            console.error('Error:', err);
            
            // Add error message to chat
            const errorMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: 'bot',
                text: "Sorry, I encountered an error. Please try again later.",
                timestamp: new Date()
            };
            setChatArray(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className='w-2/5 bg-slate-900 flex flex-col h-full'>
            <p className='text-xl bg-slate-950 p-4'>CodeVibe AI-BOT</p>
            <div className='overflow-auto flex-1 p-4 space-y-4'>
                {chatArray.map((message) => (
                    message.sender === 'bot' ? (
                        <ChatCardBot 
                            key={message.id}
                            comment={message.text}
                        />
                    ) : (
                        <ChatCardUser 
                            key={message.id}
                            comment={message.text}
                        />
                    )
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-lg p-3 max-w-xs animate-pulse">
                            <div className="h-4 rounded w-3/4">Loading..</div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-sm p-2">{error}</div>
                )}
            </div>
            <div className='p-4 bg-slate-950 rounded-t-2xl'>
                <div className='flex justify-between items-center pb-2'>
                    <p className='overflow-auto h-12 text-sm text-slate-400'>
                        The Chatbot gives helpful hints to guide you in solving the problem but won't provide full code. 
                        Use it to better understand and approach the problem.
                    </p>
                    <Button 
                        type='submit' 
                        className='bg-slate-800 p-1 rounded-lg h-16 w-16 hover:bg-slate-700 disabled:opacity-50'
                        onClick={handleSubmit}
                        disabled={loading || !userText.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 scale-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </Button>
                </div>
                <div>
                    <Textarea 
                        placeholder='Type your question here...'
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className='resize-none'
                    />
                </div>
            </div>
        </div>
    )
}

export default RightDiv