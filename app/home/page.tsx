'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingMenu from '@/components/layout/FloatingMenu';
import HeroSection from '@/components/sections/HeroSection';
import HeroSectionModern from '@/components/sections/HeroSectionModern';
import HeroSectionBold from '@/components/sections/HeroSectionBold';
import HeroSectionElegant from '@/components/sections/HeroSectionElegant';
import IntroSection from '@/components/sections/IntroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import StatsSection from '@/components/sections/StatsSection';
import DynamicSection from '@/components/sections/DynamicSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageContent } from '@/hooks/useFirestore';
import { useTemplate } from '@/contexts/TemplateContext';

export default function HomePage() {
  const { content, sections, loading, error } = usePageContent('home');
  const { currentTemplate, loading: templateLoading } = useTemplate();

  console.log('Current template:', currentTemplate, 'Loading:', templateLoading);

  const getHeroSection = () => {
    const heroProps = { data: content?.hero };

    console.log('Rendering hero with template:', currentTemplate);

    switch (currentTemplate) {
      case 'modern':
        console.log('Using Modern template');
        return <HeroSectionModern {...heroProps} />;
      case 'bold':
        console.log('Using Bold template');
        return <HeroSectionBold {...heroProps} />;
      case 'elegant':
        console.log('Using Elegant template');
        return <HeroSectionElegant {...heroProps} />;
      default:
        console.log('Using Classic template');
        return <HeroSection {...heroProps} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Skeleton */}
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>

          {/* Content Skeletons */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <Skeleton className="h-12 w-1/3 mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h2>
              <p className="text-gray-600 mb-6">
                There was an error loading the page content. Please check your Firebase configuration.
              </p>
              <a
                href="/admin"
                className="btn-theme-primary px-6 py-3 rounded-lg transition-colors"
              >
                Go to Admin Panel
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h2>
              <p className="text-gray-600 mb-6">
                Please initialize the default data from the admin panel to see the website content.
              </p>
              <a
                href="/admin"
                className="btn-theme-primary px-6 py-3 rounded-lg transition-colors"
              >
                Go to Admin Panel
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        {content?.hero && getHeroSection()}

        {/* Intro Section */}
        {content?.intro && <IntroSection data={content.intro} />}

        {/* Services Section */}
        {content?.services && <ServicesSection data={content.services} />}

        {/* Features Section */}
        {content?.features && <FeaturesGrid data={content.features} />}

        {/* Stats Section */}
        {content?.stats && <StatsSection data={content.stats} />}

        {/* Dynamic Sections */}
        {sections && sections.length > 0 && sections.map((section: any) => (
          <DynamicSection key={section.id} section={section} />
        ))}

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        {content?.cta && <CTASection data={content.cta} />}
      </main>

      <Footer />
      <FloatingMenu />
    </div>
  );
}
