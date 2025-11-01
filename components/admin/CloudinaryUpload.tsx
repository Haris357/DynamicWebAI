'use client';

import { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
  placeholder?: string;
}

export default function CloudinaryUpload({
  value,
  onChange,
  folder = 'website-uploads',
  className = '',
  placeholder = 'https://example.com/image.jpg'
}: CloudinaryUploadProps) {
  const [imageUrl, setImageUrl] = useState(value || '');

  useEffect(() => {
    setImageUrl(value || '');
  }, [value]);

  const handleSuccess = (result: any) => {
    const url = result?.info?.secure_url;
    if (url) {
      setImageUrl(url);
      onChange(url);
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setImageUrl(newUrl);
    onChange(newUrl);
  };

  const handleRemove = () => {
    setImageUrl('');
    onChange('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Manual URL Input */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center">
          <LinkIcon className="h-3 w-3 mr-1" />
          Enter Image URL
        </label>
        <div className="relative">
          <Input
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder={placeholder}
            className="pr-10"
          />
          {imageUrl && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* Upload Button */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'}
        options={{
          folder: folder,
          maxFiles: 1,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
          maxFileSize: 10000000, // 10MB
        }}
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
            variant="outline"
            className="w-full border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            {imageUrl ? 'Upload New Image' : 'Upload Image from Device'}
          </Button>
        )}
      </CldUploadWidget>

      {/* Image Preview */}
      {imageUrl && (
        <div className="relative group mt-3">
          <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="flex items-start space-x-3">
              {/* Image Preview */}
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* URL Display */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 mb-1">Image Preview:</p>
                <p className="text-xs text-gray-500 break-all line-clamp-2">
                  {imageUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Paste a URL or upload an image (JPG, PNG, GIF, WebP, SVG - Max 10MB)
      </p>
    </div>
  );
}
