import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

interface Comment {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
}

const DiscussionCard = ({ _id, name, title, desc, date }: {
  _id: string;
  name: string;
  title: string;
  desc: string;
  date: string;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Fetching comments for post ${_id}`);
      const response = await fetch(`http://localhost:5001/api/v1/discussion/${_id}/comments`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch comments');
      }
  
      const data = await response.json();
      console.log('Received comments:', data);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch comments');
      setComments([]); // Ensure comments is always an array
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commenterName || !newComment) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/discussion/${_id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: commenterName, 
          text: newComment 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const addedComment = await response.json();
      setComments(prev => [addedComment, ...prev]);
      setNewComment('');
      setCommenterName('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError(error instanceof Error ? error.message : 'Failed to add comment');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <div className='mx-[450px] bg-slate-800 p-4 rounded-lg shadow-md flex space-x-4 mb-4'>
      <div>
        <p className='bg-purple-500 p-4 rounded-full'>
          {name[0].toUpperCase() + (name[1] ? name[1].toUpperCase() : '')}
        </p>
      </div>
      <div className="flex-1">
        <div className='space-y-2'>
          <p className='font-bold'>{name}</p>
          <p className='text-xl font-bold'>{title}</p>
          <p className=''>{desc}</p>
          <p className='text-sm text-gray-400'>
            {new Date(date).toLocaleString()}
          </p>
          
          <Button 
            onClick={toggleComments}
            variant="outline"
            className="mt-2 text-sm bg-gray-700 hover:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : `${showComments ? 'Hide' : 'View'} Comments`}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg> 
          </Button>

          {error && (
            <div className="text-red-500 mt-2 text-sm">{error}</div>
          )}

          {showComments && (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <div className="space-y-3 mb-4">
                {isLoading && comments.length === 0 ? (
                  <div>Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-gray-400">No comments yet</div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-700 p-3 rounded-lg">
                      <div className="font-semibold">{comment.name}</div>
                      <p className="text-gray-300">{comment.text}</p>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddComment} className="space-y-2">
                <Input
                  placeholder="Your name"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-gray-700 border-gray-600"
                />
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-gray-700 border-gray-600"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !commenterName || !newComment}
                  className="bg-purple-600 hover:bg-purple-500"
                >
                  {isLoading ? 'Posting...' : 'Add Comment'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;