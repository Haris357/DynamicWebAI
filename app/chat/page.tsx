'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  LogOut,
  Loader2,
  CheckCircle,
  MessageSquare,
  Plus,
  Menu,
  X,
  Shapes,
  Zap,
  Clock,
  Send
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useWebsiteData } from '@/contexts/WebsiteDataContext';
import { generateWebsiteWithAI, saveChatMessage, activateAIGeneratedWebsite } from '@/lib/geminiService';
import WebsiteBuildingAnimation from '@/components/chat/WebsiteBuildingAnimation';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { chatHistory, loadWebsiteData, loadChatHistory } = useWebsiteData();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    if (!auth) {
      toast.error('Authentication not available');
      return;
    }
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
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
      const chatId = Date.now().toString();
      const websiteData = await generateWebsiteWithAI(prompt, user.uid, chatId);
      await saveChatMessage(user.uid, chatId, prompt, websiteData);
      await activateAIGeneratedWebsite(user.uid, chatId);
      await loadChatHistory();
      await loadWebsiteData(chatId);

      toast.success('Website generated successfully! Redirecting...');

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
      await activateAIGeneratedWebsite(user.uid, chatId);
      await loadWebsiteData(chatId);
      toast.success('Website loaded successfully!', { id: toastId });
      router.push('/home');
    } catch (error) {
      console.error('Error loading chat:', error);
      toast.error('Failed to load website data', { id: toastId });
    }
  };

  const handleNewChat = () => {
    setPrompt('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
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

      <div className="h-screen bg-white text-zinc-950 selection:bg-orange-100 selection:text-orange-900 font-sans overflow-hidden flex">
        {/* --- Ambient Background --- */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/20 to-blue-100/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative z-20 w-80 bg-white border-r border-zinc-200 flex flex-col h-full"
            >
              {/* Sidebar Header - Fixed */}
              <div className="flex-shrink-0 p-6 border-b border-zinc-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center shadow-md">
                      <Shapes className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">Builder.ai</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={handleNewChat}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/10"
                >
                  <Plus className="h-4 w-4" />
                  New Website
                </button>
              </div>

              {/* Chat History - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-zinc-400 py-12">
                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-zinc-400" />
                    </div>
                    <p className="text-sm font-medium text-zinc-600">No websites yet</p>
                    <p className="text-xs text-zinc-400 mt-1">Create your first AI website!</p>
                  </div>
                ) : (
                  chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleChatClick(chat.id)}
                      className="w-full text-left p-4 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all duration-200 group border border-zinc-200 hover:border-zinc-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-zinc-700 group-hover:text-zinc-900 line-clamp-2 font-medium mb-1">
                            {chat.prompt}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                            <Clock className="h-3 w-3" />
                            {chat.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Sidebar Footer - Fixed */}
              <div className="flex-shrink-0 p-4 border-t border-zinc-200 bg-zinc-50">
                <div className="flex items-center gap-3 mb-3 px-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-900 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  className="w-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 transition-colors font-medium text-sm border border-zinc-200"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full relative z-10">
          {/* Header - Fixed */}
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-zinc-200"
          >
            <div className="px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                )}
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span className="text-zinc-900">AI Website Builder</span>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Chat Messages Area - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-6 border border-orange-100">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Powered by AI</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
                  What would you like to build today?
                </h1>

                <p className="text-lg text-zinc-500 max-w-xl mx-auto">
                  Describe your business and we'll create a production-ready website in seconds
                </p>
              </motion.div>

              {/* Example Prompts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { emoji: '🧘', text: 'A luxury spa with booking and treatment menu' },
                  { emoji: '🍕', text: 'Restaurant with online menu and reservations' },
                  { emoji: '💪', text: 'Fitness center with class schedules' },
                  { emoji: '🏨', text: 'Hotel with room booking system' }
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example.text)}
                    disabled={generating}
                    className="text-left p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{example.emoji}</span>
                      <p className="text-sm text-zinc-600 group-hover:text-zinc-900 font-medium">
                        {example.text}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 pt-6"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> No code needed
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> SEO optimized
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Mobile responsive
                </span>
              </motion.div>
            </div>
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="flex-shrink-0 border-t border-zinc-200 bg-white/80 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <textarea
                    placeholder="Describe your business in detail... (e.g., A modern fitness studio with class schedules, trainer profiles, and online booking)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerate();
                      }
                    }}
                    className="w-full min-h-[80px] max-h-[200px] bg-white border-2 border-zinc-200 focus:border-orange-500 text-zinc-900 placeholder:text-zinc-400 resize-none text-base rounded-2xl px-5 py-4 pr-24 outline-none transition-all shadow-sm"
                    disabled={generating}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={generating || !prompt.trim()}
                    className={cn(
                      "absolute right-3 bottom-3 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all flex items-center gap-2",
                      generating || !prompt.trim()
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white hover:scale-105 shadow-orange-500/30"
                    )}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Building...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 mt-2 text-center">
                  Press <kbd className="px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200 font-mono">Enter</kbd> to generate or{' '}
                  <kbd className="px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200 font-mono">Shift + Enter</kbd> for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
