'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Settings, 
  Palette, 
  Layout, 
  Users, 
  MessageSquare, 
  Smartphone,
  Zap,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Eye,
  Code,
  Stars,
  Crown,
  Rocket,
  Heart,
  Award,
  Target,
  Lightbulb,
  Layers,
  BarChart3,
  Mail,
  FileText,
  Image,
  Video,
  Navigation,
  PaintBucket,
  Monitor,
  Tablet,
  MousePointer
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Visual Page Builder",
      description: "Drag-and-drop interface to create stunning pages without coding",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "20+ Color Themes",
      description: "Professional color schemes that transform your entire website instantly",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Business Templates",
      description: "Pre-built templates for gyms, beauty parlours, restaurants, and more",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Responsive",
      description: "Perfect display on all devices - mobile, tablet, and desktop",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Form Management",
      description: "Contact forms, booking systems, and submission tracking",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Fast",
      description: "Built with Next.js and Firebase for enterprise-grade security",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const businessTypes = [
    {
      icon: "🏋️‍♂️",
      name: "Fitness Centers",
      description: "Gyms, personal training, yoga studios",
      features: ["Membership forms", "Trainer profiles", "Class schedules", "Equipment showcase"]
    },
    {
      icon: "💄",
      name: "Beauty Salons",
      description: "Beauty parlours, spas, nail salons",
      features: ["Appointment booking", "Service galleries", "Treatment packages", "Before/after showcases"]
    },
    {
      icon: "🍽️",
      name: "Restaurants",
      description: "Restaurants, cafes, catering services",
      features: ["Menu displays", "Table reservations", "Chef profiles", "Event catering"]
    },
    {
      icon: "🏥",
      name: "Healthcare",
      description: "Clinics, dental offices, wellness centers",
      features: ["Appointment booking", "Service descriptions", "Doctor profiles", "Patient testimonials"]
    },
    {
      icon: "🎓",
      name: "Education",
      description: "Schools, training centers, tutoring",
      features: ["Course catalogs", "Enrollment forms", "Instructor profiles", "Student testimonials"]
    },
    {
      icon: "🏢",
      name: "Professional Services",
      description: "Law firms, consulting, agencies",
      features: ["Service portfolios", "Contact forms", "Team profiles", "Case studies"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Gym Owner",
      content: "This platform transformed my gym's online presence. I went from zero web presence to a professional website in just 30 minutes!",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Maria Rodriguez",
      role: "Beauty Salon Owner",
      content: "The booking system and gallery features are perfect for my salon. My clients love the easy appointment booking!",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "David Chen",
      role: "Restaurant Manager",
      content: "Our online reservations increased by 300% after launching our website. The design templates are absolutely stunning!",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Websites Created", icon: <Globe className="h-6 w-6" /> },
    { number: "50+", label: "Business Types", icon: <Target className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Heart className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Stars className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dynamic Website Builder</h1>
                <p className="text-xs text-gray-500">Professional websites in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/website">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Website
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold">
                <Rocket className="h-4 w-4 mr-2" />
                No Coding Required
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Professional
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Websites </span>
              in Minutes
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Create stunning, fully functional websites for any business with our powerful drag-and-drop builder. 
              No technical skills needed - just choose a template and customize!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/admin">
                  <Settings className="mr-3 h-6 w-6" />
                  Start Building Now
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                asChild
              >
                <Link href="/website">
                  <Play className="mr-3 h-6 w-6" />
                  View Live Demo
                </Link>
              </Button>
            </div>

            {/* Feature Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.slice(0, 3).map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Build Amazing Websites
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform includes all the tools and features you need to create professional websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Perfect for Any Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our templates are designed specifically for different business types with industry-specific features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTypes.map((business, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-6xl mb-6 text-center">{business.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{business.name}</h3>
                  <p className="text-gray-600 mb-6 text-center">{business.description}</p>
                  
                  <div className="space-y-2">
                    {business.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your professional website up and running in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Template</h3>
              <p className="text-gray-600">Select from our business-specific templates designed for your industry</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customize Content</h3>
              <p className="text-gray-600">Edit text, images, colors, and layout using our intuitive admin panel</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Go Live</h3>
              <p className="text-gray-600">Your website is instantly live and ready to attract customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Admin Dashboard
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage every aspect of your website with our comprehensive admin panel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FileText className="h-6 w-6" />, title: "Content Editor", desc: "Edit all page content" },
              { icon: <Palette className="h-6 w-6" />, title: "Theme Manager", desc: "20+ color themes" },
              { icon: <Navigation className="h-6 w-6" />, title: "Menu Builder", desc: "Custom navigation" },
              { icon: <MessageSquare className="h-6 w-6" />, title: "Form Manager", desc: "Track submissions" },
              { icon: <Users className="h-6 w-6" />, title: "Testimonials", desc: "Customer reviews" },
              { icon: <Mail className="h-6 w-6" />, title: "Email Templates", desc: "Automated emails" },
              { icon: <BarChart3 className="h-6 w-6" />, title: "Analytics", desc: "Track performance" },
              { icon: <Settings className="h-6 w-6" />, title: "Site Settings", desc: "Global configuration" }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by Business Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade technology stack for performance, security, and scalability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "Next.js", desc: "React Framework" },
              { name: "Firebase", desc: "Backend & Auth" },
              { name: "Tailwind", desc: "CSS Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "shadcn/ui", desc: "UI Components" },
              { name: "Responsive", desc: "Mobile First" }
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Build Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Dream Website?</span>
          </h2>
          
          <p className="text-xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Join thousands of business owners who have transformed their online presence with our platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/admin">
                <Rocket className="mr-3 h-6 w-6" />
                Start Building Free
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              asChild
            >
              <Link href="/">
                <Eye className="mr-3 h-6 w-6" />
                View Demo Site
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Stars className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Dynamic Website Builder</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Create professional websites for any business without coding. 
                Powerful, flexible, and easy to use.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <div className="space-y-2 text-gray-300">
                <p>Visual Page Builder</p>
                <p>Business Templates</p>
                <p>Color Themes</p>
                <p>Form Management</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/admin" className="block text-gray-300 hover:text-blue-400 transition-colors">
                  Admin Panel
                </Link>
                <Link href="/website" className="block text-gray-300 hover:text-blue-400 transition-colors">
                  Demo Website
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Dynamic Website Builder. Built with Next.js, Firebase, and shadcn/ui.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}