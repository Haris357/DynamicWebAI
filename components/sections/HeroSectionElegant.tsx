'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
}

export default function HeroSectionElegant({ data }: HeroSectionProps) {
  if (!data) {
    return null;
  }

  const content = data;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Elegant Background with Image */}
      {content.backgroundImage && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${content.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90" />
        </motion.div>
      )}

      {/* Elegant Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ transform: 'rotate(45deg)' }} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mb-8"
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold-400 text-sm tracking-[0.3em] uppercase font-light mb-6"
          >
            {content.subtitle}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8 leading-tight"
          >
            <span className="text-white block mb-2">{content.title}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {content.description}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mb-12"
          />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-slate-900 px-12 py-7 text-lg font-medium rounded-none border-2 border-gold-500 hover:border-gold-600 transition-all duration-300 shadow-lg shadow-gold-500/20"
                asChild
              >
                <a href={content.primaryButtonLink}>
                  {content.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-slate-900 px-12 py-7 text-lg font-medium rounded-none transition-all duration-300"
                asChild
              >
                <a href={content.secondaryButtonLink}>
                  <Play className="mr-2 h-5 w-5" />
                  {content.secondaryButtonText}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Elegant Bottom Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="mt-20"
          >
            <div className="flex justify-center items-center space-x-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
              <div className="w-2 h-2 rotate-45 border border-white/30" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .text-gold-400 {
          color: #d4af37;
        }
        .text-gold-500, .bg-gold-500 {
          color: #c5a028;
          background-color: #c5a028;
        }
        .bg-gold-600 {
          background-color: #b8941f;
        }
        .border-gold-500 {
          border-color: #c5a028;
        }
        .border-gold-600 {
          border-color: #b8941f;
        }
        .shadow-gold-500\/20 {
          box-shadow: 0 10px 40px rgba(197, 160, 40, 0.2);
        }
      `}</style>
    </section>
  );
}
