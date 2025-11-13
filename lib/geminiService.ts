import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from './firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface GeneratedWebsiteData {
  siteSettings: any;
  homePageData: any;
  aboutPageData: any;
  servicesPageData: any;
  contactPageData: any;
  joinPageData: any;
  whyPageData: any;
  navigation: any[];
  testimonials: any[];
  aboutSections: any[];
  whySections: any[];
  emailSettings: any;
  adminCredentials: {
    email: string;
    password: string;
  };
}

export async function generateWebsiteWithAI(
  prompt: string,
  userId: string,
  chatId: string
): Promise<GeneratedWebsiteData> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

  // Create a comprehensive prompt that instructs the AI to generate complete website data
  const systemPrompt = `You are an expert website content generator. Based on the user's business description, generate a complete, professional website data structure in JSON format.

The user wants: ${prompt}

CRITICAL: Generate a COMPLETE, PRODUCTION-READY website with ALL components filled out in detail. Do NOT use placeholders or generic content.

Generate a comprehensive website with ALL of the following components:

**1. SITE SETTINGS** - Complete business identity:
{
  siteName: "Business Name",
  siteTitle: "Business Name - Compelling Tagline",
  siteDescription: "2-3 sentences describing the business value proposition",
  footerDescription: "1-2 sentences about philosophy/mission",
  logoType: "icon",
  logoIcon: "Choose from: Dumbbell, UtensilsCrossed, Sparkles, Heart, Coffee, Store, Scissors, ShoppingBag, Laptop, Briefcase, Home, Building, Flame, Zap, Star",
  logoImageUrl: "",
  address: "Full realistic address",
  phone: "+1 (555) XXX-XXXX",
  email: "realistic@email.com",
  hours: "Mon-Fri: X:XX AM - X:XX PM\\nSat-Sun: X:XX AM - X:XX PM",
  instagram: "https://instagram.com/businessname",
  mapEmbed: "https://www.google.com/maps/embed?pb=...",
  colorTheme: "Choose: 'orange-red', 'red-rose', 'blue-purple', or 'green-teal'"
}

**2. HOME PAGE DATA** - Complete with ALL sections:
{
  hero: {
    title: "Main headline (2-4 words)",
    subtitle: "Supporting headline",
    description: "Compelling 1-2 sentence pitch",
    backgroundImage: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    primaryButtonText: "Action verb",
    primaryButtonLink: "/join",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about"
  },
  intro: {
    title: "Welcome section title",
    description: "2-3 sentences about the business",
    image: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  services: {
    title: "Services section title",
    subtitle: "Services subtitle",
    services: [
      {
        title: "Service 1 Name",
        description: "Detailed service description",
        image: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
      },
      // ... 2 more services (total 3)
    ]
  },
  features: {
    title: "Why choose us title",
    subtitle: "Features subtitle",
    features: [
      {
        icon: "Use a relevant emoji: 🏋️‍♂️ for gym, 🍽️ for restaurant, ✨ for spa, 💼 for business, etc.",
        title: "Feature title",
        description: "Detailed description",
        image: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
      },
      // ... 2 more (total 3) with DIFFERENT emojis
    ]
  },
  stats: {
    title: "Stats section title",
    backgroundImage: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop",
    stats: [
      { number: "XXXX", label: "Stat label", suffix: "+" },
      // ... 3 more (total 4)
    ]
  },
  cta: {
    title: "CTA title",
    subtitle: "CTA subtitle",
    description: "CTA description",
    backgroundImage: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    primaryButtonText: "Main action",
    primaryButtonLink: "/join",
    secondaryButtonText: "Call Now",
    phone: "+1 (555) XXX-XXXX"
  }
}

**3. SERVICES PAGE DATA**:
{
  hero: { title, subtitle, backgroundImage },
  packages: {
    title, subtitle,
    packages: [ // 3 packages
      {
        name, price, period, description, icon, features: [...],
        buttonText, featured: boolean, badge
      }
    ]
  }
}

**4. CONTACT PAGE DATA**:
{
  hero: { title, subtitle, backgroundImage },
  content: { title, subtitle, description }
}

**5. JOIN PAGE DATA**:
{
  hero: { title, subtitle, backgroundImage },
  form: {
    title, subtitle, description,
    dropdownLabel, dropdownPlaceholder,
    dropdownOptions: [ // 8-10 options
      { label, value }
    ]
  },
  benefits: {
    title,
    benefits: [ // 6 benefits
      { icon, title, description }
    ]
  }
}

**6. ABOUT PAGE DATA**: { hero: { title, subtitle, backgroundImage } }

**7. WHY PAGE DATA**: { hero: { title, subtitle, backgroundImage } }

**8. NAVIGATION** - 6 items with order:
[
  { label: "Home", href: "/home", order: 0 },
  { label: "About Us", href: "/about", order: 1 },
  { label: "Services", href: "/services", order: 2 },
  { label: "Why/Menu", href: "/why", order: 3 },
  { label: "Contact", href: "/contact", order: 4 },
  { label: "Join/Reserve", href: "/join", order: 5 }
]

**9. TESTIMONIALS** - 5 detailed testimonials:
[
  {
    name: "Full Name",
    role: "Customer type/title",
    content: "Detailed 2-3 sentence testimonial",
    rating: 5,
    image: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    order: 0
  },
  // ... 4 more (total 5)
]

**10. ABOUT SECTIONS** - 3-4 sections:
[
  {
    type: 'image-text',
    title, content: "2-3 paragraphs",
    image, imagePosition: 'right' or 'left',
    backgroundColor: 'bg-white' or 'bg-gray-50',
    pageId: 'about',
    order: 0
  },
  {
    type: 'features',
    title,
    features: [ // 6 features
      { icon: "emoji", title, description }
    ],
    backgroundColor, pageId: 'about', order: 1
  },
  {
    type: 'video',
    title, videoLayout: 'single' or 'horizontal',
    videos: [{ title, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description }],
    backgroundColor, pageId: 'about', order: 2
  }
]

**11. WHY SECTIONS** - 3-4 sections (same structure as about but pageId: 'why')

**12. EMAIL SETTINGS**:
{
  adminEmail: "admin@business.com",
  contactEmailTemplate: {
    subject: "Thank you for contacting...",
    body: "Full email template with {{name}}, {{message}} placeholders"
  },
  joinEmailTemplate: {
    subject: "Welcome to...",
    body: "Full email with {{name}}, {{phone}}, {{goal}}, {{notes}} placeholders"
  },
  adminNotificationTemplate: {
    subject: "New {{formType}} submission",
    body: "Full admin notification with all placeholders"
  }
}

**13. ADMIN CREDENTIALS** - Generate unique admin login credentials:
{
  email: "admin@[businessname].com",
  password: "Generate a secure 8-12 character password related to the business (e.g., 'Fitness2024!', 'TasteOf2024', etc.)"
}

VALID LUCIDE ICON NAMES (use ONLY these):
Dumbbell, UtensilsCrossed, Sparkles, Heart, Coffee, Store, Scissors, ShoppingBag, Laptop, Briefcase, Home, Building, Flame, Zap, Star, Users, Award, Shield, CheckCircle, Gift, Crown, Music, Camera, Palette, Cpu, Globe, Mail, Phone, MapPin

PEXELS IMAGE IDS TO USE (choose based on business type):
- Gym: 1552252, 1552106, 1431282, 1640777, 1552242, 1552103
- Restaurant: 958545, 1267320, 1640777, 1581384
- Spa: 3757942, 3865677, 3865618
- Generic business: 3184292, 3184465, 3182834

FINAL JSON STRUCTURE (return EXACTLY this):
\`\`\`json
{
  "siteSettings": { /* all fields filled */ },
  "homePageData": {
    "hero": { /* all fields */ },
    "intro": { /* all fields */ },
    "services": {
      "title": "",
      "subtitle": "",
      "services": [ /* 3 complete services */ ]
    },
    "features": {
      "title": "",
      "subtitle": "",
      "features": [ /* 3 complete features */ ]
    },
    "stats": {
      "title": "",
      "backgroundImage": "",
      "stats": [ /* 4 stats */ ]
    },
    "cta": { /* all fields */ }
  },
  "aboutPageData": { "hero": { /* all fields */ } },
  "servicesPageData": {
    "hero": { /* all fields */ },
    "packages": {
      "title": "",
      "subtitle": "",
      "packages": [ /* 3 packages */ ]
    }
  },
  "contactPageData": {
    "hero": { /* all fields */ },
    "content": { /* all fields */ }
  },
  "joinPageData": {
    "hero": { /* all fields */ },
    "form": {
      "title": "",
      "subtitle": "",
      "description": "",
      "dropdownLabel": "",
      "dropdownPlaceholder": "",
      "dropdownOptions": [ /* 8-10 options */ ]
    },
    "benefits": {
      "title": "",
      "benefits": [ /* 6 benefits */ ]
    }
  },
  "whyPageData": { "hero": { /* all fields */ } },
  "navigation": [ /* 6 nav items */ ],
  "testimonials": [ /* 5 testimonials */ ],
  "aboutSections": [ /* 3-4 sections */ ],
  "whySections": [ /* 3-4 sections */ ],
  "emailSettings": {
    "adminEmail": "",
    "contactEmailTemplate": { "subject": "", "body": "" },
    "joinEmailTemplate": { "subject": "", "body": "" },
    "adminNotificationTemplate": { "subject": "", "body": "" }
  },
  "adminCredentials": {
    "email": "admin@businessname.com",
    "password": "SecurePass123!"
  }
}
\`\`\`

CRITICAL: Return ONLY the JSON. NO markdown formatting, NO explanations, NO text before or after. Start with { and end with }. Generate complete, realistic content for the business type NOW.`;

  // Retry logic for handling 503 errors
  let lastError: any;
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        // Wait before retrying (exponential backoff)
        const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response (handle markdown code blocks)
      let jsonText = text;
      if (text.includes('```json')) {
        jsonText = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        jsonText = text.split('```')[1].split('```')[0].trim();
      }

      const generatedData = JSON.parse(jsonText);

      // Save to Firestore under user's collection
      const websiteRef = doc(db, 'userWebsites', userId, 'chats', chatId);

      await setDoc(websiteRef, {
        prompt,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId,
        chatId,
        data: generatedData,
      });

      // Success - return the data
      return generatedData;

    } catch (error: any) {
      lastError = error;

      // Check if it's a 503 error (model overloaded)
      if (error?.message?.includes('503') || error?.message?.includes('overloaded')) {
        console.log(`Model overloaded, attempt ${attempt + 1}/${maxRetries}`);
        if (attempt < maxRetries - 1) {
          continue; // Retry
        }
      } else {
        // For other errors, don't retry
        break;
      }
    }
  }

  // If we got here, all retries failed
  console.error('Error generating website with AI:', lastError);

  if (lastError?.message?.includes('503') || lastError?.message?.includes('overloaded')) {
    throw new Error('AI service is currently busy. Please try again in a few moments.');
  }

  throw new Error('Failed to generate website content. Please try again.');
}

export async function saveChatMessage(
  userId: string,
  chatId: string,
  prompt: string,
  websiteData: any
) {
  try {
    await setDoc(doc(db, 'userChats', userId, 'messages', chatId), {
      prompt,
      websiteData,
      createdAt: serverTimestamp(),
      userId,
      chatId,
    });
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
}

export async function loadUserWebsiteData(userId: string, chatId: string) {
  try {
    const websiteRef = doc(db, 'userWebsites', userId, 'chats', chatId);
    // This will be used to load the data when navigating to /home
    return websiteRef;
  } catch (error) {
    console.error('Error loading website data:', error);
    throw error;
  }
}

export async function activateAIGeneratedWebsite(userId: string, chatId: string) {
  try {
    // Get the AI-generated website data
    const { getDoc } = await import('firebase/firestore');
    const websiteRef = doc(db, 'userWebsites', userId, 'chats', chatId);
    const websiteSnap = await getDoc(websiteRef);

    if (!websiteSnap.exists()) {
      throw new Error('Website data not found');
    }

    const websiteData = websiteSnap.data();
    const generatedData = websiteData.data as GeneratedWebsiteData;

    // Clear existing data and write new data to standard Firestore location
    const batch = writeBatch(db);

    // Site Settings
    batch.set(doc(db, 'siteSettings', 'main'), generatedData.siteSettings);

    // Pages
    batch.set(doc(db, 'pages', 'home'), generatedData.homePageData);
    batch.set(doc(db, 'pages', 'about'), generatedData.aboutPageData);
    batch.set(doc(db, 'pages', 'services'), generatedData.servicesPageData);
    batch.set(doc(db, 'pages', 'contact'), generatedData.contactPageData);
    batch.set(doc(db, 'pages', 'join'), generatedData.joinPageData);
    batch.set(doc(db, 'pages', 'why'), generatedData.whyPageData);

    // Email Settings
    batch.set(doc(db, 'emailSettings', 'main'), generatedData.emailSettings);

    // Admin Credentials
    batch.set(doc(db, 'adminCredentials', 'main'), {
      email: generatedData.adminCredentials.email,
      password: generatedData.adminCredentials.password,
      createdAt: serverTimestamp(),
      websiteId: chatId
    });

    await batch.commit();

    // Delete old navigation, testimonials, and sections
    const { getDocs, deleteDoc, query: firestoreQuery, collection: firestoreCollection } = await import('firebase/firestore');

    const navigationSnapshot = await getDocs(firestoreCollection(db, 'navigation'));
    const testimonialsSnapshot = await getDocs(firestoreCollection(db, 'testimonials'));
    const sectionsSnapshot = await getDocs(firestoreCollection(db, 'sections'));

    const deletePromises = [
      ...navigationSnapshot.docs.map(d => deleteDoc(d.ref)),
      ...testimonialsSnapshot.docs.map(d => deleteDoc(d.ref)),
      ...sectionsSnapshot.docs.map(d => deleteDoc(d.ref))
    ];

    await Promise.all(deletePromises);

    // Add new navigation, testimonials, and sections
    const addPromises = [
      ...generatedData.navigation.map(item => addDoc(collection(db, 'navigation'), { ...item, visible: true })),
      ...generatedData.testimonials.map(item => addDoc(collection(db, 'testimonials'), item)),
      ...generatedData.aboutSections.map(item => addDoc(collection(db, 'sections'), item)),
      ...generatedData.whySections.map(item => addDoc(collection(db, 'sections'), item))
    ];

    await Promise.all(addPromises);

    return { success: true, message: 'AI-generated website activated successfully!' };
  } catch (error) {
    console.error('Error activating AI website:', error);
    throw error;
  }
}
