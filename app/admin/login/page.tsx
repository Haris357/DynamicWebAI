'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Eye, EyeOff, Lock, Mail, Shield, Copy, Check } from 'lucide-react';
import { verifyAdminCredentials, setAdminSession, isAdminLoggedIn, getAdminCredentials } from '@/lib/adminAuth';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminCreds, setAdminCreds] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  // Load admin credentials on mount
  useEffect(() => {
    loadCredentials();

    // Check if already logged in
    if (isAdminLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  const loadCredentials = async () => {
    const creds = await getAdminCredentials();
    if (creds) {
      setAdminCreds(creds);
      // Pre-fill with the generated credentials
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    toast.loading('Verifying credentials...', { id: 'admin-login' });

    try {
      const isValid = await verifyAdminCredentials(email, password);

      if (isValid) {
        setAdminSession(email);
        toast.success('Login successful! Redirecting...', { id: 'admin-login' });
        router.push('/admin');
      } else {
        setError('Invalid email or password. Please check the credentials below.');
        toast.error('Invalid credentials', { id: 'admin-login' });
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('Login failed', { id: 'admin-login' });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Secure access to your website dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">Sign In</CardTitle>
            <p className="text-sm text-gray-600">Use your AI-generated credentials</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* AI-Generated Credentials Info */}
        {adminCreds && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm rounded-lg p-5 border-2 border-green-200 shadow-lg">
            <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              🤖 AI-Generated Admin Credentials
            </h3>
            <div className="space-y-3">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs font-semibold text-gray-600 mb-1">Email</div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-900 break-all">{adminCreds.email}</code>
                  <button
                    onClick={() => handleCopy(adminCreds.email, 'email')}
                    className="ml-2 p-1.5 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs font-semibold text-gray-600 mb-1">Password</div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-900">{adminCreds.password}</code>
                  <button
                    onClick={() => handleCopy(adminCreds.password, 'password')}
                    className="ml-2 p-1.5 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                  >
                    {copiedField === 'password' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> These credentials were auto-generated by AI when your website was created. Keep them safe!
                </p>
              </div>
            </div>
          </div>
        )}

        {!adminCreds && (
          <div className="mt-6 bg-yellow-50 backdrop-blur-sm rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ No admin credentials found. Please generate a website first using the AI chat.
            </p>
          </div>
        )}

        {/* Features List */}
        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1"></div>
              Content Management
            </div>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1"></div>
              Form Submissions
            </div>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
              Site Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
