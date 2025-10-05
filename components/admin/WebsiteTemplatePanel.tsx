'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout, Check, Monitor, Smartphone, Tablet, Stars, Zap, Award } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { toast } from 'sonner';

interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  structure: {
    navigation: string;
    hero: string;
    layout: string;
  };
}

const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Professional layout perfect for most businesses',
    preview: 'Standard navigation, full-width hero, grid layouts',
    features: ['Standard header', 'Full-width sections', 'Grid layouts', 'Professional styling'],
    structure: {
      navigation: 'standard',
      hero: 'fullscreen',
      layout: 'standard'
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Artistic layout with split-screen design',
    preview: 'Split hero sections, masonry grids, creative layouts',
    features: ['Split-screen hero', 'Masonry layouts', 'Creative grids', 'Artistic styling'],
    structure: {
      navigation: 'overlay',
      hero: 'split',
      layout: 'masonry'
    }
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    description: 'Clean, minimal design with lots of white space',
    preview: 'Minimal navigation, clean typography, white space',
    features: ['Minimal header', 'Clean typography', 'White space', 'Zen aesthetics'],
    structure: {
      navigation: 'minimal',
      hero: 'minimal',
      layout: 'minimal'
    }
  },
  {
    id: 'dynamic-interactive',
    name: 'Dynamic Interactive',
    description: 'Interactive elements with sidebar navigation',
    preview: 'Sidebar navigation, interactive sections, dynamic content',
    features: ['Sidebar navigation', 'Interactive elements', 'Dynamic sections', 'Modern UX'],
    structure: {
      navigation: 'sidebar',
      hero: 'interactive',
      layout: 'dynamic'
    }
  },
  {
    id: 'magazine-editorial',
    name: 'Magazine Editorial',
    description: 'Editorial-style layout with bold typography',
    preview: 'Bold typography, magazine layouts, editorial styling',
    features: ['Bold typography', 'Magazine grids', 'Editorial style', 'Content focus'],
    structure: {
      navigation: 'overlay',
      hero: 'editorial',
      layout: 'magazine'
    }
  }
];

export default function WebsiteTemplatePanel() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern-business');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCurrentTemplate();
  }, []);

  const loadCurrentTemplate = async () => {
    try {
      const settings = await getSiteSettings();
      if (settings?.websiteTemplate) {
        setSelectedTemplate(settings.websiteTemplate);
      }
    } catch (error) {
      console.error('Error loading website template:', error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplate(templateId);
    
    setIsLoading(true);
    toast.loading('Applying website template...', { id: 'website-template' });
    
    try {
      // Get current settings
      const currentSettings = await getSiteSettings() || {};
      
      // Update with new template
      await updateSiteSettings({
        ...currentSettings,
        websiteTemplate: templateId
      });
      
      // Apply template class to document
      document.documentElement.className = document.documentElement.className
        .replace(/website-template-[\w-]+/g, '')
        .trim();
      document.documentElement.classList.add(`website-template-${templateId}`);
      
      toast.success('Website template applied successfully!', { id: 'website-template' });
    } catch (error) {
      console.error('Error saving website template:', error);
      toast.error('Error applying website template', { id: 'website-template' });
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateIcon = (templateId: string) => {
    const icons = {
      'modern-business': <Monitor className="h-5 w-5" />,
      'creative-portfolio': <Stars className="h-5 w-5" />,
      'minimal-zen': <Stars className="h-5 w-5" />,
      'dynamic-interactive': <Zap className="h-5 w-5" />,
      'magazine-editorial': <Award className="h-5 w-5" />
    };
    return icons[templateId as keyof typeof icons] || <Layout className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layout className="h-5 w-5" />
          <span>Website Structure Templates</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a website structure that affects the overall layout, navigation style, and content organization.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {websiteTemplates.map((template) => (
            <div 
              key={template.id}
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handleTemplateChange(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {getTemplateIcon(template.id)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <p className="text-sm text-gray-700 mb-4 italic">{template.preview}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Template Structure Effects:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Navigation bar style and positioning</li>
            <li>• Hero section layout and structure</li>
            <li>• Content section organization</li>
            <li>• Grid and layout patterns</li>
            <li>• Overall page flow and hierarchy</li>
            <li>• Responsive behavior patterns</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Current Template:</h4>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white">
              {getTemplateIcon(selectedTemplate)}
            </div>
            <span className="text-green-800 font-medium">
              {websiteTemplates.find(t => t.id === selectedTemplate)?.name || 'Modern Business'}
            </span>
            <Badge variant="outline" className="text-green-700 border-green-300">
              Active
            </Badge>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Responsive Design:</h4>
          <div className="flex items-center space-x-6 text-sm text-yellow-800">
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tablet className="h-4 w-4" />
              <span>Tablet</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </div>
          </div>
          <p className="text-sm text-yellow-800 mt-2">
            All templates are fully responsive and optimized for all devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}