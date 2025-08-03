# 🚀 Quick Setup Guide

Your MN Jewel Portfolio is ready to deploy! Here's how to get it running locally and deploy it for free.

## 🏃‍♂️ Quick Start (Works Immediately)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

**That's it!** Your portfolio will work immediately with built-in fallback data.

## 📁 Project Structure

```
├── App.tsx                 # Main application
├── components/             # All React components
├── styles/globals.css      # Tailwind v4 styles  
├── utils/supabase/         # Database configuration
├── .env.local             # Environment variables (optional)
└── package.json           # Dependencies
```

## 🎨 Features Included

✅ **3D Animations** - Motion/React powered animations  
✅ **Responsive Design** - Works on all devices  
✅ **Project Showcase** - GuestAi, Waiter_Ai, PUNCH-CLOCK  
✅ **Client Testimonials** - Real success stories  
✅ **Contact Form** - Working contact system  
✅ **Admin Dashboard** - Content management  
✅ **SEO Optimized** - Meta tags and performance  

## 🔧 Environment Variables (Optional)

The portfolio works perfectly without any setup, but you can add these for CMS features:

Create `.env.local` file:
```env
# Only needed if you want CMS functionality
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CONTACT_EMAIL=mnjewelps@gmail.com
```

**Without these:** Portfolio uses built-in static data  
**With these:** Portfolio connects to Supabase CMS

## 🚀 Deploy for FREE

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOURUSERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project" → Import your repository
   - Click "Deploy" (no configuration needed!)
   - Live in 2 minutes at `https://your-project.vercel.app`

### Option 2: Netlify

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop your `dist` folder
   - Live instantly!

### Option 3: GitHub Pages

```bash
# Add to package.json scripts:
"homepage": "https://YOURUSERNAME.github.io/portfolio",
"deploy": "gh-pages -d dist"

# Install and deploy:
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🎯 Customization

### Update Personal Info
Edit the `fallbackData` object in `App.tsx`:
- Projects
- Testimonials  
- Settings (email, LinkedIn, GitHub)
- FAQs

### Change Styling
- Main styles: `styles/globals.css`
- Components: Individual `.tsx` files
- Colors: CSS custom properties in globals.css

### Add New Sections
1. Create component in `components/`
2. Import and use in `App.tsx`
3. Follow existing patterns for animations

## 🐛 Troubleshooting

### Portfolio not loading?
- Check browser console for errors
- Ensure all dependencies installed: `npm install`
- Try clearing cache: `Ctrl+F5` / `Cmd+Shift+R`

### Build failing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment variable errors?
- The portfolio works without environment variables
- Check `.env.local` file format (no spaces around `=`)
- Environment variables must start with `VITE_`

## 🎉 Success Checklist

After deployment, verify:
- ✅ Portfolio loads on mobile and desktop
- ✅ All sections display (projects, testimonials, etc.)
- ✅ Animations work smoothly
- ✅ Contact form submits (if Supabase configured)
- ✅ Fast loading times
- ✅ No console errors

## 📞 Support

Need help? Check:
1. Browser developer console for errors
2. This README for common solutions
3. Deployment platform documentation

---

**🎯 Your portfolio is production-ready and will look exactly like the Figma Make version!**

Built with ❤️ for MN Jewel - Full-Stack AI Developer at w3j LLC