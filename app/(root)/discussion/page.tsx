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
import { BASE_URL } from '@/lib/url'
import useUserStore from '@/store/userStore'

const API_BASE_URL = 'http://localhost:5001';

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/api/v1/discussion`, {
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

// components/Discussion.tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!user) {
    setError('You must be logged in to create a post');
    return;
  }

  setIsLoading(true);
  setError(null);
  
  try {
    const postData = {
      name: user.name,
      title: formData.title,
      description: formData.description,
      userId: user._id
    };

    const response = await fetch(`${BASE_URL}/api/v1/discussion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create post');
    }

    // Update local state
    setPosts(prev => [data, ...prev]);
    setFormData({
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
            <Button 
              variant="outline" 
              className='bg-purple-500 hover:bg-purple-400'
              disabled={!user}
            >
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
                    Author
                  </Label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    value={user?.name || ''}
                    disabled
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
                  disabled={isLoading || !user}
                >
                  {isLoading ? 'Posting...' : 'Add it!!'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading && !posts.length ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error: {error} [The backend is hosted on render.com it migh take some white to load the content. approx 50 seconds]</div>
      ) : (
        <div className='mx-[450px]'>
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