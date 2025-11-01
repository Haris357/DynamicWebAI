# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in your admin panel.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for a **FREE** account (no credit card required)
3. Verify your email address

## Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll be on the **Dashboard**
2. You'll see your **Account Details** section with:
   - **Cloud Name** (e.g., `dxxwcby8l`)
   - **API Key**
   - **API Secret**

3. Copy your **Cloud Name** - you'll need this!

## Step 3: Create an Upload Preset

An upload preset is required for unsigned uploads (no authentication needed).

1. In your Cloudinary Dashboard, click **Settings** (gear icon in top right)
2. Click on the **Upload** tab in the left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Configure your preset:
   - **Signing Mode**: Select **Unsigned**
   - **Preset name**: Enter a name (e.g., `website-uploads` or `ml_default`)
   - **Folder**: (Optional) Enter a folder name like `dynamic-website`
   - **Upload manipulations**: Keep default settings
6. Click **Save**
7. Copy the **preset name** you just created

## Step 4: Update Your .env.local File

1. Open your `.env.local` file in the project root
2. Update the Cloudinary configuration:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
```

3. Replace:
   - `your_cloud_name_here` with your actual **Cloud Name** from Step 2
   - `your_preset_name_here` with your **preset name** from Step 3

### Example:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxwcby8l
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=website-uploads
```

## Step 5: Restart Your Development Server

After updating the `.env.local` file, you MUST restart your development server:

1. Stop the server (Ctrl + C)
2. Run `npm run dev` again
3. The image uploader will now work!

## How to Use the Image Uploader

In your admin panel, wherever you see image fields, you now have TWO options:

### Option 1: Paste a URL
- Simply paste an image URL in the input field
- Great for using images from stock photo sites

### Option 2: Upload from Device
- Click the "Upload Image from Device" button
- Select an image from your computer
- The image will be uploaded to Cloudinary
- The URL will automatically populate

## Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WebP
- SVG

**Maximum file size**: 10MB

## Troubleshooting

### Upload button doesn't work
- Make sure you've added the correct **Cloud Name** and **Upload Preset** to `.env.local`
- Make sure you've **restarted** the development server after updating `.env.local`
- Check that your upload preset is set to **Unsigned** mode

### "Invalid upload preset" error
- Double-check the preset name matches exactly what you created in Cloudinary
- Make sure there are no extra spaces in the `.env.local` file

### Images not displaying
- Check if the image URL is valid
- Try opening the URL in a new browser tab to verify it works

## Free Tier Limits

Cloudinary's free tier includes:
- **25 GB storage**
- **25 GB bandwidth per month**
- **1,000 transformations per month**

This is more than enough for most small to medium websites!

## Security Note

The current setup uses **unsigned uploads** for ease of use. For production websites with high traffic, you may want to implement **signed uploads** with authentication for better security.

For now, this setup is perfect for development and small production websites!
