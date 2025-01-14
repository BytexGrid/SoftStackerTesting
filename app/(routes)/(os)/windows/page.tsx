'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WindowsTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'developer', name: 'Developer' },
    { id: 'designer', name: 'Designer' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'gaming', name: 'Gaming' }
  ];

  // Temporary template data
  const templates = [
    {
      id: 1,
      title: 'Web Developer Essential',
      description: 'Perfect setup for web developers including VS Code, Node.js, and more',
      category: 'developer',
      apps: ['VS Code', 'Node.js', 'Git', 'Chrome', 'Postman'],
      votes: 128
    },
    {
      id: 2,
      title: 'UI/UX Designer Pack',
      description: 'Complete toolkit for UI/UX designers',
      category: 'designer',
      apps: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
      votes: 95
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Windows Software Templates
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Find the perfect software setup for your Windows machine
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {template.votes} votes
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{template.description}</p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Included Apps:</h4>
                <div className="flex flex-wrap gap-2">
                  {template.apps.map(app => (
                    <span
                      key={app}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/windows/${template.id}`}
                className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors inline-block text-center"
              >
                View Template
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 