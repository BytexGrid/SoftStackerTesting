'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  apps: {
    name: string;
    description: string;
    website: string;
    category: string;
    isRequired: boolean;
    chocolateyPackage?: string;
  }[];
  votes: number;
};

export default function WindowsTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'developer', name: 'Developer' },
    { id: 'designer', name: 'Designer' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'gaming', name: 'Gaming' }
  ];

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        const url = new URL('/api/templates', window.location.href);
        url.searchParams.set('os', 'windows');
        if (selectedCategory !== 'all') {
          url.searchParams.set('category', selectedCategory);
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch templates');
        
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err instanceof Error ? err.message : 'Failed to load templates');
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [selectedCategory]);

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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading templates...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Templates Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No templates found for this category.</p>
              </div>
            ) : (
              templates.map(template => (
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
                          key={app.name}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300"
                        >
                          {app.name}
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 