'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Zap,
  Globe,
  Rocket,
  ArrowRight,
  CheckCircle,
  Brain,
  Wand2,
  Code,
  Palette,
  Layout,
  Users,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const [businessType, setBusinessType] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();

  // Auto-redirect to /chat if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/chat');
    }
  }, [user, loading, router]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50" />
                <Sparkles className="h-8 w-8 text-white relative z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                AI WebBuilder
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6"
                asChild
              >
                <Link href="/signin">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-50" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-semibold">Powered by AI</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              Generate Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Website
              </span>
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Just describe your business, and our AI will instantly create a fully functional,
              beautifully designed website tailored to your needs.
            </motion.p>

            {/* AI Input Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2 flex items-center space-x-2">
                  <Wand2 className="h-6 w-6 text-purple-400 ml-4" />
                  <Input
                    placeholder="E.g., Create a modern gym website with membership plans..."
                    className="bg-transparent border-0 text-white placeholder:text-gray-500 text-lg focus-visible:ring-0"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 h-12"
                    asChild
                  >
                    <Link href="/signin">
                      Generate
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                No credit card required • Get started in 2 minutes
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: Zap, text: 'Instant Generation' },
                { icon: Palette, text: '20+ Themes' },
                { icon: Layout, text: 'Fully Customizable' },
                { icon: Globe, text: 'SEO Optimized' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 flex items-center space-x-2"
                >
                  <feature.icon className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to your perfect website
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Business',
                description: 'Tell our AI about your business type, style preferences, and what features you need',
                icon: Brain
              },
              {
                step: '02',
                title: 'AI Generates Website',
                description: 'Our AI creates a complete website with content, images, and design tailored to your business',
                icon: Wand2
              },
              {
                step: '03',
                title: 'Customize & Launch',
                description: 'Fine-tune your website with our editor and launch it to the world in minutes',
                icon: Rocket
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="text-6xl font-bold text-white/10 mb-4 group-hover:text-white/20 transition-colors">
                      {item.step}
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Features
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to build a professional website
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Content Generation',
                description: 'Automatically generate compelling content for every page'
              },
              {
                icon: Palette,
                title: 'Smart Design System',
                description: 'AI selects perfect colors, fonts, and layouts for your brand'
              },
              {
                icon: Layout,
                title: 'Dynamic Sections',
                description: 'Add, remove, and customize sections with drag-and-drop'
              },
              {
                icon: Globe,
                title: 'Multi-Business Support',
                description: 'Gym, restaurant, salon, healthcare, and 20+ more templates'
              },
              {
                icon: Code,
                title: 'No Code Required',
                description: 'Build professional websites without writing a single line of code'
              },
              {
                icon: Users,
                title: 'Customer Management',
                description: 'Handle form submissions, bookings, and customer inquiries'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10K+', label: 'Websites Generated' },
                { number: '99%', label: 'Satisfaction Rate' },
                { number: '2min', label: 'Average Setup Time' },
                { number: '24/7', label: 'AI Support' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-30" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  Ready to Build Your
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI-Powered Website?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join thousands of businesses using AI to create stunning websites
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg"
                    asChild
                  >
                    <Link href="/signin">
                      Start Building Now
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    AI-powered generation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    Instant deployment
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">AI WebBuilder</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 AI WebBuilder. Powered by Next.js & Firebase.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
