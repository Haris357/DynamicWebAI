'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Check, Stars, Crown, Zap, Star, Heart, Award } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { toast } from 'sonner';

interface DesignTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
}

const designTemplates: DesignTemplate[] = [
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    description: 'Sleek gradients with glass morphism effects',
    preview: 'Smooth animations, gradient backgrounds, modern cards',
    features: ['Gradient backgrounds', 'Glass morphism', 'Smooth animations', 'Modern cards']
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Timeless design with clean lines',
    preview: 'Professional layout, clean typography, subtle shadows',
    features: ['Clean typography', 'Professional layout', 'Subtle effects', 'Timeless design']
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimalist approach',
    preview: 'White backgrounds, minimal elements, focus on content',
    features: ['Minimal elements', 'White space', 'Content focus', 'Clean lines']
  },
  {
    id: 'bold-dynamic',
    name: 'Bold Dynamic',
    description: 'Eye-catching with dynamic effects',
    preview: 'Bold colors, dynamic animations, 3D effects',
    features: ['Bold animations', '3D effects', 'Dynamic colors', 'Eye-catching']
  },
  {
    id: 'creative-artistic',
    name: 'Creative Artistic',
    description: 'Artistic flair with creative elements',
    preview: 'Artistic layouts, creative animations, unique styling',
    features: ['Artistic layouts', 'Creative animations', 'Unique styling', 'Artistic flair']
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    description: 'Corporate-ready professional design',
    preview: 'Business-focused, professional colors, corporate layout',
    features: ['Business focused', 'Professional colors', 'Corporate layout', 'Trust building']
  },
  {
    id: 'futuristic-neon',
    name: 'Futuristic Neon',
    description: 'Sci-fi inspired with neon effects',
    preview: 'Neon glows, dark themes, futuristic elements',
    features: ['Neon effects', 'Dark themes', 'Futuristic design', 'Glow animations']
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    description: 'Nature-inspired organic shapes',
    preview: 'Organic shapes, natural colors, flowing animations',
    features: ['Organic shapes', 'Natural colors', 'Flowing animations', 'Nature inspired']
  }
];

export default function DesignTemplatePanel() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern-gradient');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCurrentTemplate();
  }, []);

  const loadCurrentTemplate = async () => {
    try {
      const settings = await getSiteSettings();
      if (settings?.designTemplate) {
        setSelectedTemplate(settings.designTemplate);
      }
    } catch (error) {
      console.error('Error loading design template:', error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplate(templateId);
    
    setIsLoading(true);
    toast.loading('Applying design template...', { id: 'design-template' });
    
    try {
      // Get current settings
      const currentSettings = await getSiteSettings() || {};
      
      // Update with new template
      await updateSiteSettings({
        ...currentSettings,
        designTemplate: templateId
      });
      
      // Apply template class to document
      document.documentElement.className = document.documentElement.className
        .replace(/design-template-[\w-]+/g, '')
        .trim();
      document.documentElement.classList.add(`design-template-${templateId}`);
      
      toast.success('Design template applied successfully!', { id: 'design-template' });
    } catch (error) {
      console.error('Error saving design template:', error);
      toast.error('Error applying design template', { id: 'design-template' });
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateIcon = (templateId: string) => {
    const icons = {
      'modern-gradient': <Stars className="h-5 w-5" />,
      'classic-elegant': <Crown className="h-5 w-5" />,
      'minimal-clean': <Star className="h-5 w-5" />,
      'bold-dynamic': <Zap className="h-5 w-5" />,
      'creative-artistic': <Palette className="h-5 w-5" />,
      'professional-corporate': <Award className="h-5 w-5" />,
      'futuristic-neon': <Zap className="h-5 w-5" />,
      'organic-nature': <Heart className="h-5 w-5" />
    };
    return icons[templateId as keyof typeof icons] || <Palette className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Design Templates</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a design style that affects the visual appearance of cards, buttons, and animations across your website.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designTemplates.map((template) => (
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
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                  {getTemplateIcon(template.id)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 italic">{template.preview}</p>
              
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Design Template Effects:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Card styling and hover effects</li>
            <li>• Button appearance and animations</li>
            <li>• Section backgrounds and overlays</li>
            <li>• Typography and spacing adjustments</li>
            <li>• Hero section visual effects</li>
            <li>• Overall visual theme and mood</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Current Template:</h4>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white">
              {getTemplateIcon(selectedTemplate)}
            </div>
            <span className="text-green-800 font-medium">
              {designTemplates.find(t => t.id === selectedTemplate)?.name || 'Modern Gradient'}
            </span>
            <Badge variant="outline" className="text-green-700 border-green-300">
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}