'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const operatingSystems = [
    {
      name: 'Windows',
      description: 'Find software templates for Windows 10 and 11',
      href: '/windows',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg'
    },
    {
      name: 'macOS',
      description: 'Discover tools and apps for your Mac',
      href: '/macos',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/30/MacOS_logo.svg'
    },
    {
      name: 'Linux',
      description: 'Explore open-source software for Linux distributions',
      href: '/linux',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Icons8_flat_linux.svg'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Full width with contained content */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-gray-900 dark:to-gray-900">
        {/* Animated grid background */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0.3 }}
          animate={{ 
            scale: [1, 1.01, 1],
            rotate: [0, 0.2, 0],
            opacity: isDarkTheme ? [0.3, 0.4, 0.3] : [0.6, 0.7, 0.6]
          }}
          transition={{ 
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f4d_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px] transition-opacity duration-300"></div>
        </motion.div>

        {/* Floating orbs in background */}
        <motion.div
          className="absolute inset-0 overflow-hidden mix-blend-soft-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDarkTheme ? 1 : 0.7 }}
          transition={{ duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-72 h-72 rounded-full bg-gradient-radial from-indigo-500/30 via-indigo-500/20 to-transparent blur-xl"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0.8
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <div className="relative pt-16 pb-24 sm:pb-32">
          <div className="mx-auto px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Perfect Software Stack
                <motion.span 
                  className="block text-indigo-600 dark:text-indigo-400 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.span
                    className="absolute -inset-1 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 blur-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  Awaits Discovery
                </motion.span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Find the best tools and applications for your workflow. Community-curated software templates for every profession and use case.
              </motion.p>
              <motion.div 
                className="mt-10 flex items-center justify-center gap-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a 
                  href="#explore" 
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-indigo-400 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-white/20 to-indigo-400/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Get Started
                </motion.a>
                <motion.a 
                  href="#how-it-works" 
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Learn more 
                  <motion.span 
                    aria-hidden="true"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
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

            {/* OS Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {operatingSystems.map((os) => (
                <Link
                  key={os.name}
                  href={os.href}
                  className="group relative bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <Image
                        src={os.icon}
                        alt={os.name}
                        width={48}
                        height={48}
                        className="transition-transform group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {os.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
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
