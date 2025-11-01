'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Wand2, LogOut, Loader2, CheckCircle, ArrowRight, MessageSquare, Plus, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsiteData } from '@/contexts/WebsiteDataContext';
import { generateWebsiteWithAI, saveChatMessage, activateAIGeneratedWebsite } from '@/lib/geminiService';
import WebsiteBuildingAnimation from '@/components/chat/WebsiteBuildingAnimation';

export default function ChatPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { chatHistory, loadWebsiteData, loadChatHistory } = useWebsiteData();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
      // Navigate to landing page
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your business first');
      return;
    }

    if (!user) {
      toast.error('You must be signed in to generate a website');
      return;
    }

    setGenerating(true);

    try {
      // Generate unique chat ID
      const chatId = Date.now().toString();

      // Generate website with AI
      const websiteData = await generateWebsiteWithAI(prompt, user.uid, chatId);

      // Save chat message
      await saveChatMessage(user.uid, chatId, prompt, websiteData);

      // Activate the AI-generated website (copy to standard Firestore location)
      await activateAIGeneratedWebsite(user.uid, chatId);

      // Reload chat history
      await loadChatHistory();

      // Load the generated website data into context
      await loadWebsiteData(chatId);

      toast.success('Website generated successfully! Redirecting...');

      // Small delay to show success before redirect
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (error) {
      console.error('Generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate website. Please try again.';
      toast.error(errorMessage);
      setGenerating(false);
    }
  };

  const handleChatClick = async (chatId: string) => {
    if (!user) return;

    const toastId = toast.loading('Loading your website...');

    try {
      // Activate the AI-generated website (copy to standard Firestore location)
      await activateAIGeneratedWebsite(user.uid, chatId);

      // Load into context
      await loadWebsiteData(chatId);

      toast.success('Website loaded successfully!', { id: toastId });

      // Navigate to home
      router.push('/home');
    } catch (error) {
      console.error('Error loading chat:', error);
      toast.error('Failed to load website data', { id: toastId });
    }
  };

  const handleNewChat = () => {
    setPrompt('');
    setSidebarOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push('/signin');
    return null;
  }

  return (
    <>
      {/* Website Building Animation Overlay */}
      {generating && <WebsiteBuildingAnimation />}

      <div className="min-h-screen bg-black text-white overflow-hidden flex">
        {/* Animated Background Grid */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-80 bg-black/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  <span className="font-semibold">Your Chats</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Button
                onClick={handleNewChat}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Website
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No chats yet</p>
                  <p className="text-xs">Create your first website!</p>
                </div>
              ) : (
                chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-4 w-4 text-purple-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 group-hover:text-white line-clamp-2 transition-colors">
                          {chat.prompt}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {chat.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="text-xs text-gray-400 mb-2">{user?.email}</div>
              <Button
                variant="ghost"
                className="w-full text-white hover:text-white hover:bg-white/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/50 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-8 w-8 text-white" />
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    AI WebBuilder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-12 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6">
                <Wand2 className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-sm font-semibold">AI Website Generator</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Describe Your Dream Website
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Tell our AI what kind of business website you need, and we'll generate a complete,
                fully functional website tailored to your requirements.
              </p>
            </motion.div>

            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3 text-gray-300">
                      Your Business Description
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-20 rounded-2xl" />
                      <Textarea
                        placeholder="E.g., I need a modern gym website with membership plans, trainer profiles, class schedules, and a booking system. The design should be energetic and motivating with blue and orange colors..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="relative min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-gray-500 resize-none text-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                        disabled={generating}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Be as detailed as possible. Include business type, features needed, design preferences, and target audience.
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={generating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Your Website...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate My Website
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">Tips for Better Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Be Specific',
                    description: 'Mention your business type, industry, and target audience'
                  },
                  {
                    title: 'List Features',
                    description: 'Describe what features and sections you want on your website'
                  },
                  {
                    title: 'Design Style',
                    description: 'Share your color preferences and design style (modern, elegant, bold, etc.)'
                  }
                ].map((tip, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-1">{tip.title}</h4>
                          <p className="text-sm text-gray-400">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Example Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 mb-12"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">Example Prompts</h3>
              <div className="space-y-3">
                {[
                  'Create a luxury spa website with booking system, treatment menu, therapist profiles, and a serene design with soft pastels',
                  'Build a restaurant website with online menu, table reservations, chef profiles, and food gallery with warm earthy tones',
                  'Design a fitness center website with class schedules, trainer bios, membership plans, and an energetic modern look'
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    disabled={generating}
                    className="w-full text-left p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {example}
                      </p>
                      <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
