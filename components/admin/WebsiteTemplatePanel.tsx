'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useTemplate } from '@/contexts/TemplateContext';

const websiteTemplates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with full-width hero and standard sections',
    preview: 'bg-gradient-to-br from-orange-500 to-red-600',
    features: ['Full-width hero', 'Fixed parallax', 'Standard sections', 'Classic animations']
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean, minimalist design with split-screen layout and subtle animations',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300',
    features: ['Split-screen layout', 'Minimalist design', 'Subtle animations', 'Feature cards']
  },
  {
    id: 'bold',
    name: 'Bold & Dynamic',
    description: 'Vibrant gradients, bold typography, and energetic animations',
    preview: 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700',
    features: ['Gradient backgrounds', 'Bold typography', 'Animated elements', 'Floating effects']
  },
  {
    id: 'elegant',
    name: 'Elegant Luxury',
    description: 'Sophisticated dark theme with gold accents and smooth transitions',
    preview: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    features: ['Dark luxury theme', 'Gold accents', 'Smooth transitions', 'Serif typography']
  }
];

export default function WebsiteTemplatePanel() {
  const { currentTemplate, setTemplate, loading } = useTemplate();
  const [applying, setApplying] = useState(false);

  const handleApplyTemplate = async (templateId: string) => {
    setApplying(true);
    toast.loading('Applying template...', { id: 'template' });

    try {
      console.log('Applying template:', templateId);
      await setTemplate(templateId);
      console.log('Template set successfully, reloading page...');
      toast.success('Template applied successfully! Reloading...', { id: 'template' });

      // Reload the page to apply template changes
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 1000);
    } catch (error) {
      console.error('Error applying template:', error);
      toast.error('Failed to apply template: ' + (error as Error).message, { id: 'template' });
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Website Design Templates
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform your entire website with professionally designed templates. Each template includes
              unique layouts, animations, and styles that completely change the look and feel of your website.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {websiteTemplates.map((template) => {
          const isActive = currentTemplate === template.id;

          return (
            <Card
              key={template.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl ${
                isActive
                  ? 'ring-2 ring-purple-600 shadow-lg'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <div className={`absolute inset-0 ${template.preview} transition-transform duration-500 group-hover:scale-110`}>
                    {/* Preview Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {template.id === 'modern' && (
                          <div className="space-y-2">
                            <div className="h-2 w-32 bg-white/30 rounded mx-auto" />
                            <div className="h-4 w-48 bg-white/50 rounded mx-auto" />
                            <div className="h-2 w-40 bg-white/30 rounded mx-auto" />
                          </div>
                        )}
                        {template.id === 'bold' && (
                          <div className="space-y-3">
                            <div className="h-6 w-48 bg-white/80 rounded-lg mx-auto" />
                            <div className="flex justify-center gap-2">
                              <div className="h-8 w-24 bg-white/60 rounded-lg" />
                              <div className="h-8 w-24 bg-white/40 rounded-lg" />
                            </div>
                          </div>
                        )}
                        {template.id === 'elegant' && (
                          <div className="space-y-2">
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
                            <div className="h-3 w-40 bg-yellow-400/30 rounded mx-auto" />
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
                          </div>
                        )}
                        {template.id === 'classic' && (
                          <div className="space-y-3">
                            <div className="h-4 w-48 bg-white/60 rounded mx-auto" />
                            <div className="h-3 w-36 bg-white/40 rounded mx-auto" />
                            <div className="flex justify-center gap-2 mt-4">
                              <div className="h-6 w-20 bg-white/50 rounded-full" />
                              <div className="h-6 w-20 bg-white/30 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Badge */}
                  {isActive && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Check className="h-3 w-3" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Apply Button */}
                  <Button
                    onClick={() => handleApplyTemplate(template.id)}
                    disabled={isActive || applying}
                    className={`w-full ${
                      isActive
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                    }`}
                  >
                    {isActive ? 'Currently Active' : 'Apply Template'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-gray-600">
              Each template is fully responsive and optimized for all devices. Your content stays the same,
              only the design and animations change. Try different templates to find the perfect look for your brand!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
