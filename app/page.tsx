'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  ArrowRight,
  Layout,
  MousePointer2,
  CheckCircle2,
  PlayCircle,
  Shapes,
  Wand2,
  Code2,
  Smartphone,
  Globe,
  ChevronDown,
  Check,
  Star,
  Rocket
} from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// --- UI Components (Inlined for portability) ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = ({ className, variant = "default", size = "default", asChild = false, children, ...props }: ButtonProps) => {
  const Comp = asChild ? 'span' : 'button';
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 shadow",
    destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90 shadow-sm",
    outline: "border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80",
    ghost: "hover:bg-zinc-100 hover:text-zinc-900",
    link: "text-zinc-900 underline-offset-4 hover:underline",
  };
  const sizes: Record<string, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <Comp className={cn(baseStyles, variants[variant], sizes[size], className)} {...props as any}>
      {children}
    </Comp>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

// --- Page Components ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

interface NumberTickerProps {
  value: number;
}

const NumberTicker = ({ value }: NumberTickerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-zinc-100 last:border-none">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-zinc-900 transition-colors hover:text-orange-600"
      >
        {question}
        <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage() {
  const [businessType, setBusinessType] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const router = useRouter();
  const { user, loading } = useAuth();
  const { scrollYProgress } = useScroll();

  // Parallax Values
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const yShapes = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    if (!loading && user) router.push('/chat');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 selection:bg-orange-100 selection:text-orange-900 font-sans overflow-x-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div style={{ y: yShapes }} className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-orange-100/30 to-pink-100/30 rounded-full blur-[120px]" />
        <motion.div style={{ y: yShapes }} className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/30 to-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      {/* --- Header --- */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100/50 supports-[backdrop-filter]:bg-white/60"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight group">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-black/10">
              <Shapes className="w-5 h-5 text-white" />
            </div>
            <span>Builder<span className="text-zinc-400">.ai</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            {['Features', 'Showcase', 'Pricing', 'FAQ'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors hidden sm:block">
              Log in
            </Link>
            <Button asChild className="rounded-full bg-black hover:bg-zinc-800 text-white px-6 py-5 transition-all hover:scale-105 shadow-xl shadow-black/10">
              <Link href="/signin">Start Building</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* --- Hero Section --- */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-8 border border-orange-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI-Powered Generation 2.0 is live</span>
          </motion.div>

          <motion.h1 
            style={{ y: yHero }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-8 leading-[0.95]"
          >
            <span className="block overflow-hidden">
              <motion.span initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} className="block">
                Websites dreamed
              </motion.span>
            </span>
            <span className="block overflow-hidden">
               <motion.span initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.33, 1, 0.68, 1] }} className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent pb-4">
                into existence.
              </motion.span>
            </span>
          </motion.h1>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              No drag-and-drop. No templates. Just describe your vision, and our AI builds a production-ready website in seconds.
            </p>
          </FadeIn>

          {/* Interactive Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative z-20 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl shadow-orange-500/10 border border-zinc-100 flex items-center gap-2 ring-1 ring-zinc-100">
              <div className="pl-4">
                <Wand2 className="w-5 h-5 text-orange-500" />
              </div>
              <input 
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. Minimalist portfolio for a photographer in Tokyo..."
                className="flex-1 bg-transparent border-none text-lg outline-none placeholder:text-zinc-400 h-12 text-zinc-900 min-w-0"
              />
              <Button asChild size="lg" className="h-12 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold shadow-md transition-all hover:scale-105">
                <Link href="/signin">Generate</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-zinc-500 font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> No code required</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> SEO Optimized</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free to start</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Trusted By Marquee --- */}
      <section className="py-12 border-y border-zinc-100 bg-zinc-50/50 overflow-hidden">
        <p className="text-center text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-8">Trusted by forward-thinking teams</p>
        <div className="flex relative w-full overflow-hidden">
          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap min-w-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'Linear', 'Vercel', 'Raycast', 'OpenAI', 'Stripe', 'Figma', 'Notion'].map((brand) => (
                  <span key={brand} className="text-2xl font-bold font-serif text-zinc-800 cursor-default">{brand}</span>
                ))}
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent z-10" />
        </div>
      </section>

      {/* --- Visual Showcase (Video Placeholder) --- */}
      <section id="showcase" className="py-24 px-6">
        <FadeIn className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border border-zinc-200 bg-zinc-100/50 p-2 lg:p-4 shadow-2xl shadow-zinc-200">
            <div className="rounded-2xl overflow-hidden bg-white border border-zinc-100 aspect-video relative group">
              {/* UI Mockup Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
                <div className="h-10 bg-zinc-50 border-b border-zinc-100 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="mx-auto w-1/3 h-5 bg-zinc-200/50 rounded-md" />
                </div>
              </div>
              
              {/* Content Placeholder (Simulating Video) */}
              <div className="w-full h-full bg-zinc-50 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50" />
                 <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative z-20 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer group-hover:shadow-2xl transition-all"
                 >
                    <PlayCircle className="w-8 h-8 text-orange-600 ml-1" />
                 </motion.div>
                 
                 {/* Floating UI Elements Animation */}
                 <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/4 left-1/4 w-48 h-32 bg-white rounded-xl shadow-xl border border-zinc-100 p-4"
                 >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg mb-3" />
                    <div className="w-full h-2 bg-zinc-100 rounded mb-2" />
                    <div className="w-2/3 h-2 bg-zinc-100 rounded" />
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, 30, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-xl shadow-xl border border-zinc-100 p-4 flex flex-col justify-end"
                 >
                    <div className="w-full h-24 bg-orange-50 rounded-lg mb-3" />
                    <div className="flex gap-2">
                      <div className="w-1/2 h-8 bg-black rounded-lg" />
                      <div className="w-1/2 h-8 bg-zinc-100 rounded-lg" />
                    </div>
                 </motion.div>
              </div>
            </div>
            
            {/* Decorative Blobs behind mockup */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl -z-10" />
          </div>
        </FadeIn>
      </section>

      {/* --- Features Grid (Bento) --- */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Designed for velocity.</h2>
            <p className="text-xl text-zinc-500">
              We've automated the hard parts of web development so you can focus on the story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Feature 1 - Large */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-100 relative overflow-hidden group"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Instant Generation</h3>
                  <p className="text-zinc-500 text-lg max-w-md">Our neural engine builds layouts, writes copy, and selects images in under 30 seconds.</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent opacity-0 md:opacity-100">
                {/* Abstract UI Representation */}
                <div className="absolute right-[-20%] top-[10%] w-[120%] h-[120%] bg-white border border-zinc-100 rounded-2xl shadow-lg p-6 rotate-[-12deg] group-hover:rotate-[-8deg] transition-transform duration-500">
                  <div className="w-full h-8 bg-zinc-50 rounded-lg mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                     <div className="h-32 bg-orange-50/50 rounded-lg border border-orange-100" />
                     <div className="h-32 bg-zinc-50 rounded-lg" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 - Tall */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:row-span-2 bg-black text-white rounded-3xl p-8 md:p-12 relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-pink-600/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Mobile First</h3>
                  <p className="text-zinc-400 text-lg mb-8">Every pixel is optimized for mobile responsiveness automatically.</p>
                  
                  <div className="flex-1 relative">
                     <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[240px] h-[400px] bg-zinc-900 border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-500">
                        <div className="w-full h-full bg-white opacity-90 p-4">
                           <div className="w-full h-32 bg-zinc-100 rounded-xl mb-3" />
                           <div className="w-2/3 h-4 bg-zinc-100 rounded mb-2" />
                           <div className="w-full h-2 bg-zinc-100 rounded" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all"
            >
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Clean Code</h3>
              <p className="text-zinc-500">Export standard Next.js & Tailwind code. No lock-in.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">SEO Ready</h3>
              <p className="text-zinc-500">Perfect Lighthouse scores out of the box.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- How It Works (Steps) --- */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-4xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">From idea to launch in minutes</h2>
           </div>
           
           <div className="relative">
             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200" />
             
             {[
               { title: "Describe It", desc: "Tell the AI about your business, vibe, and goals.", icon: MousePointer2 },
               { title: "Refine It", desc: "Use the visual editor to tweak text, images, and colors.", icon: Layout },
               { title: "Ship It", desc: "Publish to a custom domain or export the code.", icon: Rocket }
             ].map((step, i) => (
               <FadeIn key={i} delay={i * 0.2} className="relative pl-24 pb-16 last:pb-0">
                 <div className="absolute left-0 w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center z-10 shadow-sm">
                   <step.icon className="w-6 h-6 text-orange-600" />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                 <p className="text-lg text-zinc-500 leading-relaxed">{step.desc}</p>
               </FadeIn>
             ))}
           </div>
        </div>
      </section>

      {/* --- Testimonials (Wall of Love) --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Loved by creators</h2>
            <div className="flex items-center justify-center gap-2 text-orange-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              <span className="text-zinc-950 font-bold ml-2">4.9/5</span>
              <span className="text-zinc-400 text-sm">(2,000+ reviews)</span>
            </div>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
               { text: "I built my portfolio in 3 minutes. I'm not kidding. The design quality is insane.", author: "Alex D.", role: "Product Designer" },
               { text: "Finally, a website builder that doesn't produce bloat code. The export feature is a lifesaver.", author: "Sarah J.", role: "Frontend Dev" },
               { text: "The AI copywriter actually sounds human. It saved me days of staring at a blank screen.", author: "Mike T.", role: "Founder" },
               { text: "Game changer for my agency. We can prototype client sites in real-time meetings now.", author: "Elena R.", role: "Creative Director" },
               { text: "Better than Squarespace, faster than Webflow. This is the sweet spot.", author: "David K.", role: "Photographer" },
               { text: "The SEO optimization is legit. My site ranked on page 1 within a week.", author: "Chris P.", role: "Local Business" },
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="break-inside-avoid bg-zinc-50 p-6 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4 text-orange-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-zinc-700 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-full" />
                  <div>
                    <div className="font-bold text-sm">{review.author}</div>
                    <div className="text-xs text-zinc-500">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Pricing --- */}
      <section id="pricing" className="py-24 px-6 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Simple pricing</h2>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-black' : 'text-zinc-500'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 bg-black rounded-full p-1 relative transition-colors"
              >
                <motion.div 
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                  animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-black' : 'text-zinc-500'}`}>Yearly <span className="text-orange-600 text-xs font-bold ml-1">-20%</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Free */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-xl mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-6">$0<span className="text-base font-normal text-zinc-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['1 Website', 'Builder.ai Domain', 'Basic Analytics'].map(f => (
                  <li key={f} className="flex items-center text-sm text-zinc-600"><Check className="w-4 h-4 mr-2 text-zinc-400" /> {f}</li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-xl" asChild><Link href="/signin">Start Free</Link></Button>
            </div>

            {/* Pro - Featured */}
            <div className="bg-black text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500" />
              <div className="absolute top-4 right-4 bg-white/20 text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <h3 className="font-bold text-xl mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                ${billingCycle === 'monthly' ? '19' : '15'}
                <span className="text-base font-normal text-zinc-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited Websites', 'Custom Domains', 'Export Code', 'Remove Branding', 'Priority Support'].map(f => (
                  <li key={f} className="flex items-center text-sm text-zinc-300"><Check className="w-4 h-4 mr-2 text-orange-500" /> {f}</li>
                ))}
              </ul>
              <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl font-bold py-6" asChild><Link href="/signin">Get Started</Link></Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-xl mb-2">Agency</h3>
              <div className="text-3xl font-bold mb-6">
                ${billingCycle === 'monthly' ? '49' : '39'}
                <span className="text-base font-normal text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Team Collaboration', 'Client Handover', 'White Label', 'API Access'].map(f => (
                  <li key={f} className="flex items-center text-sm text-zinc-600"><Check className="w-4 h-4 mr-2 text-zinc-400" /> {f}</li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-xl" asChild><Link href="/signin">Contact Sales</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-2">
            {[
              { q: "Do I need to know how to code?", a: "Absolutely not. Builder.ai is designed for non-technical users. You just describe what you want, and we build it. You can then edit text and images visually." },
              { q: "Can I use my own domain?", a: "Yes! On the Pro plan and above, you can connect any custom domain (e.g., yourname.com) instantly." },
              { q: "Is the generated code good?", a: "We pride ourselves on this. We export semantic, accessible, and clean React code using Tailwind CSS. It's comparable to code written by a senior developer." },
              { q: "Can I export the website?", a: "Yes. You're not locked in. You can download the source code at any time and host it elsewhere if you prefer." },
            ].map((item, i) => (
              <AccordionItem 
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/30 to-pink-600/30 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
              Ready to ship?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">
              Join <NumberTicker value={15000} />+ creators building the web of tomorrow, today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/signin">
                <Button size="lg" className="h-16 px-12 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                  Start Building Free
                </Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-zinc-100 bg-zinc-50 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-6">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Shapes className="w-4 h-4 text-white" />
              </div>
              Builder.ai
            </div>
            <p className="text-zinc-500 max-w-sm mb-6">
              The world's most advanced AI website builder. Designed in San Francisco, building for the world.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-zinc-200 text-zinc-400 hover:text-black hover:border-black transition-all cursor-pointer"><Globe className="w-4 h-4" /></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Showcase</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-black transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-black transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
          <p>© 2025 Builder Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            System Operational
          </div>
        </div>
      </footer>

    </div>
  );
}