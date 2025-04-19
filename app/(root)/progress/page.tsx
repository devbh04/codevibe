import React from 'react';
import { BarChart3, Trophy, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white-900">
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 border border-white-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">Total Solved</h2>
          </div>
          <p className="text-4xl font-bold">158</p>
          <p className="text-white-500 mt-2">Problems completed</p>
        </div>
        
        <div className="bg-slate-800 border border-white-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold">Success Rate</h2>
          </div>
          <p className="text-4xl font-bold">67.5%</p>
          <p className="text-white-500 mt-2">Average success rate</p>
        </div>
        
        <div className="bg-slate-800 border border-white-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">Ranking</h2>
          </div>
          <p className="text-4xl font-bold">#4,521</p>
          <p className="text-white-500 mt-2">Global position</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-white-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Difficulty Breakdown</h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white-600">Easy Problems</span>
              <span className="text-green-500">45/123</span>
            </div>
            <div className="h-2 bg-white-200 rounded-full">
              <div className="h-full w-[37%] bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white-600">Medium Problems</span>
              <span className="text-yellow-500">78/421</span>
            </div>
            <div className="h-2 bg-white-200 rounded-full">
              <div className="h-full w-[19%] bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white-600">Hard Problems</span>
              <span className="text-red-500">35/284</span>
            </div>
            <div className="h-2 bg-white-200 rounded-full">
              <div className="h-full w-[12%] bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-white-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { problem: "Binary Tree Traversal", status: "Solved", time: "2 hours ago", difficulty: "Easy" },
            { problem: "Merge K Sorted Lists", status: "Attempted", time: "5 hours ago", difficulty: "Hard" },
            { problem: "Valid Parentheses", status: "Solved", time: "1 day ago", difficulty: "Easy" },
            { problem: "LRU Cache", status: "Attempted", time: "2 days ago", difficulty: "Medium" }
          ].map((activity, index) => (
            <div key={index} className={`py-3 ${
              index !== 3 ? 'border-b border-white-200' : ''
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{activity.problem}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`text-sm ${
                      activity.difficulty === "Easy" ? "text-green-500" :
                      activity.difficulty === "Medium" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>{activity.difficulty}</span>
                    <span className="text-sm text-white-500">{activity.time}</span>
                  </div>
                </div>
                <span className={activity.status === "Solved" ? "text-green-500" : "text-white-500"}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}