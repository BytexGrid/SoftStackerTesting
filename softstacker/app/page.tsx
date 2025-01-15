'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [molePosition, setMolePosition] = useState({ x: 0, y: 0 });
  const [isHiding, setIsHiding] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if dark theme is active
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHiding) {
        cursorX.set(e.clientX - 128);
        cursorY.set(e.clientY - 128);
        
        // Only check distance if in light theme
        if (!isDarkTheme) {
          const dx = e.clientX - molePosition.x;
          const dy = e.clientY - molePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100 && !isHiding) {
            setIsHiding(true);
            setTimeout(moveMole, 800); // Move after hiding animation
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHiding, isDarkTheme, molePosition]);

  useEffect(() => {
    // Reset mole state when theme changes
    if (!isDarkTheme) {
      setIsHiding(false);
      moveMole();
    }
  }, [isDarkTheme]);

  const moveMole = () => {
    const gridSize = 24;
    const maxX = Math.floor(window.innerWidth / gridSize);
    
    // Define center content area to avoid
    const centerX = window.innerWidth / 2;
    const centerWidth = 800; // Width of center content to avoid
    const leftBound = (centerX - centerWidth/2) / gridSize;
    const rightBound = (centerX + centerWidth/2) / gridSize;
    
    let newX, newY;
    do {
      // Randomly choose left or right side
      const chooseSide = Math.random() > 0.5;
      if (chooseSide) {
        // Right side
        newX = Math.floor(Math.random() * (maxX - rightBound)) + rightBound;
      } else {
        // Left side
        newX = Math.floor(Math.random() * leftBound);
      }
      newY = Math.floor(Math.random() * 15) + 5; // Keep within hero section
    } while (
      newX < 2 || // Keep away from left edge
      newX > maxX - 2 // Keep away from right edge
    );
    
    setMolePosition({ 
      x: newX * gridSize, 
      y: newY * gridSize 
    });
    setIsHiding(false);
  };

  useEffect(() => {
    // Initial mole position
    moveMole();
    // Remove the automatic movement interval
  }, []);

  const operatingSystems = [
    {
      name: 'Windows',
      description: 'Find software templates for Windows 10 and 11',
      href: '/windows'
    },
    {
      name: 'macOS',
      description: 'Discover tools and apps for your Mac',
      href: '/macos'
    },
    {
      name: 'Linux',
      description: 'Explore open-source software for Linux distributions',
      href: '/linux'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Full width with contained content */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-100 via-white to-white dark:from-indigo-950 dark:via-gray-900 dark:to-gray-900">
        {/* Cursor light effect - only show in dark theme */}
        {isDarkTheme && (
          <motion.div
            className="fixed w-64 h-64 pointer-events-none z-10"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-indigo-500/10 to-transparent rounded-full blur-2xl transform scale-150" />
            <div className="absolute inset-0 bg-gradient-radial from-indigo-400/30 via-indigo-500/5 to-transparent rounded-full blur-xl" />
          </motion.div>
        )}

        {/* Software Mole - only show in light theme */}
        {!isDarkTheme && (
          <motion.div
            className="absolute z-10 pointer-events-none"
            animate={{
              x: molePosition.x,
              y: molePosition.y,
              scale: isHiding ? 0 : 1,
            }}
            transition={{
              type: "spring",
              duration: 0.5
            }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -top-12 whitespace-nowrap bg-white/90 backdrop-blur-sm text-sm text-gray-600 px-3 py-1 rounded-full shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isHiding ? 0 : 1, 
                  y: isHiding ? -5 : 0,
                  scale: isHiding ? 0.8 : 1
                }}
                transition={{ 
                  duration: 0.3,
                  delay: isHiding ? 0 : 0.2 
                }}
              >
                Need help finding software? 🤔
              </motion.div>
              <motion.div 
                className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
                animate={{
                  y: isHiding ? [0, 5, 20, 40] : [0, -2, 0],
                  rotate: isHiding ? [0, -5, 5, -5] : [-5, 5, -5, 5, 0],
                  scale: isHiding ? [1, 0.9, 0.8, 0] : 1
                }}
                transition={{
                  y: {
                    duration: isHiding ? 0.8 : 2,
                    times: isHiding ? [0, 0.3, 0.6, 1] : undefined,
                    ease: isHiding ? "easeIn" : "easeInOut",
                    repeat: isHiding ? 0 : Infinity
                  },
                  rotate: {
                    duration: isHiding ? 0.8 : 2,
                    repeat: isHiding ? 0 : Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.8,
                    times: [0, 0.3, 0.6, 1]
                  }
                }}
              >
                <motion.div
                  animate={{
                    y: isHiding ? [0, 10, 20] : 0
                  }}
                  transition={{
                    duration: isHiding ? 0.8 : 0,
                    times: [0, 0.5, 1],
                    ease: "easeIn"
                  }}
                >
                  <span className="text-2xl transform -scale-x-100">🦫</span>
                </motion.div>
              </motion.div>
              {isHiding && (
                <motion.div
                  className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                >
                  <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-md" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

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
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {os.name[0]}
                        </span>
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
