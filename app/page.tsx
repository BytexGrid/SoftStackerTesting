import Link from 'next/link';

export default function Home() {
  const operatingSystems = [
    {
      name: 'Windows',
      icon: '/windows.svg',
      description: 'Find software templates for Windows 10 and 11',
      href: '/windows'
    },
    {
      name: 'macOS',
      icon: '/macos.svg',
      description: 'Discover tools and apps for your Mac',
      href: '/macos'
    },
    {
      name: 'Linux',
      icon: '/linux.svg',
      description: 'Explore open-source software for Linux distributions',
      href: '/linux'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with contained width for content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Software Templates
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Find and install curated software stacks for your operating system
              </p>
            </div>
            <Link
              href="/submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Template
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section - Full width with contained content */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-gray-900 dark:to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="relative pt-16 pb-24 sm:pb-32">
          <div className="mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Your Perfect Software Stack
                <span className="block text-indigo-600 dark:text-indigo-400">Awaits Discovery</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                Find the best tools and applications for your workflow. Community-curated software templates for every profession and use case.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#explore" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-indigo-400">
                  Get Started
                </a>
                <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OS Selection Section - Full width with contained content */}
      <section id="explore" className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
                Choose Your Platform
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Select your operating system to discover curated software templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {operatingSystems.map((os) => (
                <Link
                  key={os.name}
                  href={os.href}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-8 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800 rounded-full flex items-center justify-center transition-colors">
                        <div className="text-2xl text-indigo-600 dark:text-indigo-400">{os.name[0]}</div>
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {os.name}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {os.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Full width with contained content */}
      <section id="how-it-works" className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Three simple steps to find and set up your perfect software stack
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Choose OS',
                  description: 'Select your operating system to get started'
                },
                {
                  title: 'Pick Template',
                  description: 'Browse community-curated software collections'
                },
                {
                  title: 'Install & Enjoy',
                  description: 'Automatically install all recommended software'
                }
              ].map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
