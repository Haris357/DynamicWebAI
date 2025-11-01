'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items - Show when open */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Admin Panel Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center"
          title="Admin Panel"
        >
          <Link href="/admin">
            <Settings className="h-6 w-6" />
          </Link>
        </Button>

        {/* Landing Page Button */}
        <Button
          asChild
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 flex items-center justify-center"
          title="Landing Page"
        >
          <Link href="/">
            <Home className="h-6 w-6" />
          </Link>
        </Button>
      </div>

      {/* Hamburger Toggle Button */}
      <button
        onClick={toggleMenu}
        className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-7 w-7 transition-transform duration-300" />
        ) : (
          <Menu className="h-7 w-7 transition-transform duration-300" />
        )}
      </button>

      {/* Backdrop - Close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
