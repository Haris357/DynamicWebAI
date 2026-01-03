'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeft, 
  Shapes, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/auth';
import { toast } from 'sonner';
import { auth, isConfigured } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// --- Components ---

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'ghost';
}

const Button = ({ children, onClick, disabled, className = '', variant = 'primary' }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === 'ghost'
        ? 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
        : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg hover:shadow-xl hover:scale-[1.02]'
    } ${className}`}
  >
    {children}
  </button>
);

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    // If Firebase is not configured, skip auth check
    if (!auth || !isConfigured) {
      setAuthChecking(false);
      return;
    }

    // Check if user is already signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthChecking(false);
      if (user) {
        // User is signed in, redirect to chat
        router.push('/chat');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    // Check if Firebase is configured
    if (!auth || !isConfigured) {
      toast.error('Firebase is not configured. Please set up your Firebase credentials in .env.local');
      return;
    }

    setLoading(true);
    toast.loading('Signing in with Google...');

    try {
      const result = await signInWithGoogle();

      if (result.success) {
        toast.dismiss();
        toast.success('Signed in successfully!');
        // Redirect to chat
        router.push('/chat');
      } else {
        toast.dismiss();
        toast.error(result.error || 'Failed to sign in');
        setLoading(false);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.dismiss();
      toast.error('An error occurred during sign in');
      setLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-orange-100 selection:text-orange-900 flex items-center justify-center relative overflow-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-orange-100/40 to-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/40 to-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/">
          <Button variant="ghost" className="h-10 px-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      {/* Sign In Card */}
      <div className="w-full max-w-md px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-zinc-200/50 rounded-3xl overflow-hidden ring-1 ring-zinc-100"
        >
          <div className="p-8 md:p-12 text-center">
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-8 shadow-xl shadow-black/10 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-lg" />
              <Shapes className="w-8 h-8 text-white relative z-10" />
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3">
              Welcome back
            </h1>
            <p className="text-zinc-500 mb-8">
              Sign in to continue building your dream website with AI.
            </p>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full relative group overflow-hidden bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-semibold h-14 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:border-zinc-300 hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                  <span className="text-zinc-400">Connecting...</span>
                </>
              ) : (
                <>
                  {/* Google Icon SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-zinc-400 mt-8 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-zinc-600">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-zinc-600">Privacy Policy</a>.
            </p>
          </div>

          {/* Footer Strip */}
          <div className="bg-zinc-50 border-t border-zinc-100 p-4 flex justify-center gap-6 text-xs font-medium text-zinc-500">
             <div className="flex items-center gap-1.5">
               <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure
             </div>
             <div className="flex items-center gap-1.5">
               <Sparkles className="w-3.5 h-3.5 text-orange-500" /> AI-Powered
             </div>
             <div className="flex items-center gap-1.5">
               <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Free Tier
             </div>
          </div>
        </motion.div>

        {/* Floating Abstract Element */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse pointer-events-none"
        />
      </div>
    </div>
  );
}