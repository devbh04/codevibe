'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/userStore'
import { BASE_URL } from '@/lib/url'
import ContestCard from '@/components/shared/contestcard'
import DiscussionCard from '@/components/shared/discussion-card'

const DashboardPage = () => {
  const { user } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dExpand, setDExpand] =useState(false)
  const [cExpand, setCExpand] =useState(false)
  const toggleContests = () => setCExpand(!cExpand)
  const toggleDiscussions = () => setDExpand(!dExpand)
  const [deletingComments, setDeletingComments] = useState<Record<string, boolean>>({});
  const [activity, setActivity] = useState({
    contests: [],
    discussions: [],
    comments: []
  })

  useEffect(() => {
    if (!user?._id) return

    const fetchUserActivity = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch user data with all activity
        const response = await fetch(`${BASE_URL}/api/v1/users/${user._id}/activity`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch user activity')
        }

        const activityData = await response.json()
        setActivity(activityData)
      } catch (err) {
        console.error('Error fetching user activity:', err)
        setError(err.message || 'Failed to fetch user activity')
      } finally {
        setLoading(false)
      }
    }

    fetchUserActivity()
  }, [user?._id])

  // Add these functions to your DashboardPage component
  const handleDeleteDiscussion = async (postId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/discussion/${postId}`, {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete discussion');
      }

      // Update local state
      setActivity(prev => ({
        ...prev,
        discussions: prev.discussions.filter(d => d.postId !== postId)
      }));
    } catch (err) {
      console.error('Error deleting discussion:', err);
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // Set loading state
      setDeletingComments(prev => ({ ...prev, [commentId]: true }));
      setError(null);
  
      const response = await fetch(`${BASE_URL}/api/v1/discussion/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json'
        }
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete comment');
      }
  
      // Update local state
      setActivity(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c._id !== commentId)
      }));
  
    } catch (err) {
      console.error('Delete comment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    } finally {
      // Clear loading state
      setDeletingComments(prev => ({ ...prev, [commentId]: false }));
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h2>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-purple-600 hover:bg-purple-500"
        >
          Login
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error loading dashboard</h2>
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-purple-600 hover:bg-purple-500"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" onClick={()=>console.log(activity)}>Your Activity Dashboard</h1>
        
        {/* Welcome div */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome back, {user.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Contests Attempted</h3>
              <p className="text-3xl font-bold">{activity.contests.length}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Discussions Started</h3>
              <p className="text-3xl font-bold">{activity.discussions.length}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Comments Made</h3>
              <p className="text-3xl font-bold">{activity.comments.length}</p>
            </div>
          </div>
        </div>

        {/* Recent Contests div */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recently Attempted Contests</h2>
          {activity.contests.length > 0 ? (
            <div className="space-y-6">
              {activity.contests.slice(0, cExpand ? activity.contests.length : 3).map((contest) => (
                <ContestCard
                  key={contest._id}
                  id={contest.contestId}
                  title={contest.title || 'Contest'}
                  company={contest.company || 'Unknown Company'}
                  reward={contest.reward || 'No reward specified'}
                  shortdescription={contest.shortDescription || 'No description available'}
                  datecreated={new Date(contest.submittedAt).toLocaleDateString()}
                  difficulty={contest.difficulty || 'Medium'}
                  successful={contest.successful} // Add this line
                />
              ))}
              {activity.contests.length > 3 && (
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-800 hover:bg-slate-700"
                  onClick={toggleContests}
                >
                  {cExpand ? 'Show Less' : 'View All Contests'}
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p>You haven't attempted any contests yet.</p>
              <Button 
                className="mt-4 bg-purple-600 hover:bg-purple-500"
                onClick={() => window.location.href = '/contest'}
              >
                Browse Contests
              </Button>
            </div>
          )}
        </div>

        {/* Discussions div */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Discussions</h2>
          {activity.discussions.length > 0 ? (
            <div className="space-y-6">
              {activity.discussions.slice(0, dExpand ? activity.discussions.length : 3).map((discussion) => (
                <div key={discussion.postId} className="relative">
                  <DiscussionCard
                    _id={discussion.postId}
                    name={user.name}
                    title={discussion.title}
                    desc={discussion.description}
                    date={discussion.createdAt}
                  />
                  <svg onClick={() => {handleDeleteDiscussion(discussion.postId); window.location.reload()}}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-red-500 absolute top-3 right-2 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              ))}
              {activity.discussions.length > 3 && (
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-800 hover:bg-slate-700"
                  onClick={toggleDiscussions}
                >
                  {dExpand ? 'Show Less' : 'View All Discussions'}
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p>You haven't started any discussions yet.</p>
              <Button 
                className="mt-4 bg-purple-600 hover:bg-purple-500"
                onClick={() => window.location.href = '/discussion'}
              >
                Start a Discussion
              </Button>
            </div>
          )}
        </div>

        {/* Comments div */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Comments</h2>
          {activity.comments.length > 0 ? (
            <div className="space-y-4">
              {activity.comments.map((comment) => (
                <div key={comment._id} className="bg-slate-800 p-4 rounded-lg relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{comment.text}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        On: {comment.postTitle || 'Discussion Post'}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 pr-6">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    </div>
                    <svg onClick={() => {handleDeleteComment(comment._id), window.location.reload()}}
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-red-500 absolute top-3 right-2 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
                ))}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p>You haven't made any comments yet.</p>
              <Button 
                className="mt-4 bg-purple-600 hover:bg-purple-500"
                onClick={() => window.location.href = '/discussion'}
              >
                Join a Discussion
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage