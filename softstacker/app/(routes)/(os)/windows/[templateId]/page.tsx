'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VoteButton from '@/components/VoteButton';
import { Template, App } from '@/types/template';

interface PageProps {
  params: {
    templateId: string;
  };
}

export default function TemplateDetail({ params }: PageProps) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await fetch(`/api/templates/${params.templateId}`);
        const data = await response.json();
        setTemplate(data.template);
        // Initialize selected apps with required ones
        setSelectedApps(
          data.template.apps
            .filter((app: App) => app.isRequired)
            .map((app: App) => app.name)
        );
      } catch (error) {
        console.error('Failed to fetch template:', error);
      }
    }

    fetchTemplate();
  }, [params.templateId]);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const toggleApp = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const toggleAllOptionalApps = (select: boolean) => {
    const newApps = select
      ? template.apps.map(app => app.name)
      : template.apps.filter(app => app.isRequired).map(app => app.name);
    setSelectedApps(newApps);
  };

  const generateInstallScript = () => {
    const selectedAppsList = template.apps
      .filter(app => selectedApps.includes(app.name))
      .map(app => app.chocolateyPackage)
      .filter(Boolean)
      .join(' ');

    return `# Install Chocolatey if not already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install selected packages
choco install ${selectedAppsList} -y`;
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(generateInstallScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link
            href="/windows"
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
              {template.title}
            </h1>
            <div className="flex items-center gap-4">
              <VoteButton templateId={params.templateId} initialVotes={template.votes} />
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">{template.description}</p>
        </div>

        {/* Apps Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Included Applications</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedApps.length} app{selectedApps.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllOptionalApps(true)}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleAllOptionalApps(false)}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {template.apps.map((app) => (
              <div
                key={app.name}
                className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
                  <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{app.description}</p>
                  {app.website && (
                    <a
                      href={app.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm mt-2 inline-block"
                    >
                      Learn more →
                    </a>
                  )}
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

        {/* Installation Script */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Installation Script</h2>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 relative">
            <code className="text-gray-100 font-mono text-sm block overflow-x-auto whitespace-pre pr-12">
              {generateInstallScript()}
            </code>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {copied && (
                <span className="text-sm text-green-400 bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded">
                  Copied!
                </span>
              )}
              <button
                onClick={handleCopyScript}
                className="p-2 rounded-lg bg-gray-800 dark:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                title="Copy to clipboard"
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
  );
} 