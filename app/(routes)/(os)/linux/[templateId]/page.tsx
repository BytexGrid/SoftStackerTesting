'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// This would come from a database in a real app
const templateData = {
  id: 1,
  title: 'Developer Workstation',
  description: 'Complete Linux development environment with all essential tools',
  category: 'developer',
  votes: 189,
  author: {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  apps: [
    {
      name: 'VS Code',
      description: 'Popular code editor with great extension support',
      aptPackage: 'code',
      dnfPackage: 'code',
      pacmanPackage: 'visual-studio-code-bin',
      website: 'https://code.visualstudio.com',
      category: 'Development',
      isRequired: true
    },
    {
      name: 'Docker',
      description: 'Containerization platform',
      aptPackage: 'docker.io',
      dnfPackage: 'docker',
      pacmanPackage: 'docker',
      website: 'https://www.docker.com',
      category: 'Development',
      isRequired: true
    },
    {
      name: 'Git',
      description: 'Distributed version control system',
      aptPackage: 'git',
      dnfPackage: 'git',
      pacmanPackage: 'git',
      website: 'https://git-scm.com',
      category: 'Development',
      isRequired: true
    },
    {
      name: 'Terminator',
      description: 'Advanced terminal emulator',
      aptPackage: 'terminator',
      dnfPackage: 'terminator',
      pacmanPackage: 'terminator',
      website: 'https://gnome-terminator.org',
      category: 'Development',
      isRequired: false
    }
  ],
  setupInstructions: [
    'Choose your package manager (apt, dnf, or pacman)',
    'Run the installation script',
    'Configure VS Code with recommended extensions',
    'Set up Git configuration'
  ]
};

type PackageManager = 'apt' | 'dnf' | 'pacman';

export default function TemplateDetail({ params: _params }: { params: { templateId: string } }) {
  const [selectedApps, setSelectedApps] = useState(
    templateData.apps.filter(app => app.isRequired).map(app => app.name)
  );
  const [packageManager, setPackageManager] = useState<PackageManager>('apt');

  const toggleApp = (appName: string) => {
    if (templateData.apps.find(app => app.name === appName)?.isRequired) {
      return; // Can't toggle required apps
    }
    setSelectedApps(prev =>
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const generateInstallScript = () => {
    const apps = templateData.apps.filter(app => selectedApps.includes(app.name));
    switch (packageManager) {
      case 'apt':
        return `sudo apt update
sudo apt install -y ${apps.map(app => app.aptPackage).join(' ')}`;
      case 'dnf':
        return `sudo dnf update
sudo dnf install -y ${apps.map(app => app.dnfPackage).join(' ')}`;
      case 'pacman':
        return `sudo pacman -Syu
sudo pacman -S ${apps.map(app => app.pacmanPackage).join(' ')}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            href="/linux"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Templates
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {templateData.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">{templateData.votes}</span>
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={templateData.author.avatar}
                  alt={templateData.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">by {templateData.author.name}</span>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">{templateData.description}</p>
        </div>

        {/* Package Manager Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Package Manager</h2>
          <div className="flex gap-4">
            {(['apt', 'dnf', 'pacman'] as PackageManager[]).map(pm => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${packageManager === pm
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }`}
              >
                {pm.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Included Applications</h2>
          <div className="space-y-4">
            {templateData.apps.map(app => (
              <div
                key={app.name}
                className="flex items-start p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{app.name}</h3>
                    {app.isRequired && (
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{app.description}</p>
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm mt-2 inline-block"
                  >
                    Learn more →
                  </a>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={selectedApps.includes(app.name)}
                      onChange={() => toggleApp(app.name)}
                      disabled={app.isRequired}
                    />
                    <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer 
                      ${selectedApps.includes(app.name) ? 'peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500' : ''} 
                      peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                      after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 
                      after:transition-all ${app.isRequired ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Installation Instructions</h2>
          <div className="space-y-6">
            <div className="space-y-4">
              {templateData.setupInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{instruction}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Installation Script</h3>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 relative">
                <code className="text-gray-100 font-mono text-sm block overflow-x-auto whitespace-pre">
                  {generateInstallScript()}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(generateInstallScript())}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 