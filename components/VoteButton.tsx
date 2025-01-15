'use client';

import { useState } from 'react';

interface VoteButtonProps {
  templateId: string;
  initialVotes: number;
}

export default function VoteButton({ templateId, initialVotes }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    try {
      setIsVoting(true);
      const response = await fetch(`/api/templates/${templateId}/vote`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.message === 'Vote removed') {
          setVotes(prev => prev - 1);
          setHasVoted(false);
        } else {
          setVotes(prev => prev + 1);
          setHasVoted(true);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        hasVoted
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
      }`}
    >
      <svg
        className={`w-5 h-5 ${hasVoted ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <span>{votes}</span>
    </button>
  );
} 