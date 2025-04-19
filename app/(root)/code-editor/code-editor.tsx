'use client'
import LeftDiv from '@/components/shared/LeftDiv'
import MiddleTopDiv from '@/components/shared/MiddleTopDiv'
import MiddleBottomDiv from '@/components/shared/MiddleBottomDiv'
import React, { useEffect, useState } from 'react'
import RightDiv from '@/components/shared/RightDiv'
import { useParams } from 'next/navigation'
import useTestCasesStore from '@/store/testCasesStore';

const CodeEditor = () => {
  const { id } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setNewTestCases = useTestCasesStore((state) => state.setNewTestCases);
  const setTestCases = useTestCasesStore((state) => state.setTestCases);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/contests/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch contest data');
        }
        const data = await response.json();
        setProblemData({
          title: data.title,
          difficulty: data.difficulty,
          company: data.company,
          reward: data.reward,
          shortdescription: data.shortDescription,
          description: data.problemExplanation,
          examples: data.examples,
          testCases: data.testCases,
        });
        setTestCases(data.testCases || []);
        setNewTestCases(data.testCases || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContestData();
    }
  }, [id, setTestCases]);

  if (loading) return <div>Loading problem data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problemData) return <div>No problem data found</div>;

  return (
    <div className='h-full w-full flex gap-0.5'>
      <LeftDiv {...problemData} />
      <div className='flex flex-col w-full h-full'>
        <MiddleTopDiv />
        <MiddleBottomDiv />
      </div>
      <RightDiv />
    </div>
  )
}

export default CodeEditor