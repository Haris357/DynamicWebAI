'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Layout,
  Image,
  FileText,
  Navigation,
  MessageSquare,
  Mail,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Step {
  icon: any;
  label: string;
  description: string;
}

const buildingSteps: Step[] = [
  { icon: Layout, label: 'Site Settings', description: 'Creating business identity...' },
  { icon: FileText, label: 'Home Page', description: 'Building hero & intro sections...' },
  { icon: Image, label: 'Services', description: 'Generating service packages...' },
  { icon: FileText, label: 'About Page', description: 'Crafting your story...' },
  { icon: Navigation, label: 'Navigation', description: 'Building menu structure...' },
  { icon: MessageSquare, label: 'Testimonials', description: 'Adding social proof...' },
  { icon: Mail, label: 'Email Templates', description: 'Setting up communications...' },
  { icon: Sparkles, label: 'Finalizing', description: 'Polishing your website...' },
];

export default function WebsiteBuildingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < buildingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 max-h-screen overflow-y-auto scrollbar-hide">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="flex justify-center mb-6 pt-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-black p-4 rounded-full border border-white/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-1">
            Building Your Website
          </h2>
          <p className="text-sm text-gray-400">AI is crafting your perfect business website...</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="space-y-2 mb-4">
          {buildingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 p-2.5 rounded-lg border transition-all duration-500 ${
                  isActive
                    ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/20'
                    : isCompleted
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all duration-500 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-white/5 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm font-semibold transition-colors duration-500 ${
                      isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </h3>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-gray-400 mt-0.5 truncate"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex space-x-1 flex-shrink-0"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / buildingSteps.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / buildingSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center pb-8"
        >
          <p className="text-xs text-gray-500">
            💡 AI is analyzing thousands of successful websites to create yours!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
