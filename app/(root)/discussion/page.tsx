'use client'
import DiscussionCard from '@/components/shared/discussion-card'
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

const API_BASE_URL = 'http://localhost:5001';

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: ''
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://5a38-2405-201-1018-4093-b565-43f9-9ed7-9f6a.ngrok-free.app/api/v1/discussion`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://5a38-2405-201-1018-4093-b565-43f9-9ed7-9f6a.ngrok-free.app/api/v1/discussion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      setPosts(prev => [newPost, ...prev]);
      setFormData({
        name: '',
        title: '',
        description: ''
      });
      setOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mt-10 mb-10 mx-[450px]'>
        <p className='text-3xl'>Discussion</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className='bg-purple-500 hover:bg-purple-400'>
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle>Create a Note</DialogTitle>
              <DialogDescription>
                Add your thought, your ideas or anything you want to share with the community.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input 
                    id="title" 
                    className="col-span-3" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea 
                    id="description" 
                    className="col-span-3"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className='bg-purple-500 hover:bg-purple-400 cursor-pointer'
                  disabled={isLoading}
                >
                  {isLoading ? 'Posting...' : 'Add it!!'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading && !posts.length ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      ) : (
        <div>
          {posts.map((post) => (
            <DiscussionCard 
              key={post._id}
              _id={post._id}
              name={post.name}
              title={post.title}
              desc={post.description}
              date={post.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Discussion;