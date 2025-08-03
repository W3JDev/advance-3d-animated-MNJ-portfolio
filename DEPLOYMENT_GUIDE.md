# 🚀 Complete Deployment Guide

This guide will walk you through deploying your MN Jewel Portfolio for **FREE** without any account upgrades.

## 📋 Prerequisites

- Your complete project files (downloaded from Figma Make)
- A GitHub account (free)
- Basic command line knowledge

## 🎯 Method 1: Vercel (Recommended - Easiest)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"  
   - Name it `mn-jewel-portfolio`
   - Make it public (free tier requirement)
   - Don't add README, .gitignore, or license

2. **Upload your project:**
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/mn-jewel-portfolio.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Sign up for Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign up" and use GitHub to sign up
   - This gives you automatic repository access

2. **Import your project:**
   - Click "New Project"
   - Select your `mn-jewel-portfolio` repository
   - Click "Import"

3. **Configure environment variables:**
   - In the "Environment Variables" section, add:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key_here  
   VITE_SITE_URL = https://your-project.vercel.app
   VITE_CONTACT_EMAIL = mnjewelps@gmail.com
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. **Free Vercel domain:**
   - Your site gets a free `.vercel.app` domain automatically
   - Example: `mn-jewel-portfolio.vercel.app`

2. **Custom domain (if you have one):**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain and follow DNS instructions

## 🎯 Method 2: Netlify (Alternative - Also Free)

### Step 1: Build Locally

```bash
# Install dependencies and build
npm install
npm run build
```

### Step 2: Deploy to Netlify

1. **Sign up for Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub (free)

2. **Deploy via drag & drop:**
   - Drag your `dist` folder to the Netlify deploy area
   - Your site goes live instantly!

3. **For continuous deployment:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

## 🎯 Method 3: GitHub Pages (100% Free Static)

### Step 1: Modify Package.json

Add these scripts to your `package.json`:

```json
{
  "homepage": "https://YOURUSERNAME.github.io/mn-jewel-portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 3: Deploy

```bash
npm run deploy
```

Your site will be live at `https://YOURUSERNAME.github.io/mn-jewel-portfolio`

## 🔧 Environment Variables Setup

### For Development (.env.local)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
VITE_SITE_URL=http://localhost:3000
VITE_CONTACT_EMAIL=mnjewelps@gmail.com
```

### For Production (Platform Settings)

Add these to your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`  
- `VITE_SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

## 🚨 Important Notes

### Without Supabase (Static Version)

If you don't want to set up Supabase, your portfolio will still work perfectly with the fallback data that's already built-in. Simply skip the Supabase environment variables.

### With Supabase CMS

To get the full CMS functionality:

1. **Create free Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create new project (free tier)
   - Get your URL and anon key from project settings

2. **Set up database:**
   - Use the admin dashboard to set up your data
   - Or import existing data if you have it

## 🎉 Success Checklist

After deployment, verify:
- ✅ Portfolio loads correctly
- ✅ All sections display properly  
- ✅ Animations work smoothly
- ✅ Contact form submits (if using Supabase)
- ✅ Admin panel accessible (if using Supabase)
- ✅ Mobile responsive
- ✅ Fast loading times

## 🔧 Troubleshooting

### Build Failures

1. **Check Node version:**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for TypeScript errors:**
   ```bash
   npm run type-check
   ```

### Deployment Issues

1. **Environment variables not working:**
   - Ensure they start with `VITE_`
   - Check spelling and values
   - Redeploy after adding variables

2. **404 errors on refresh:**
   - Ensure routing configuration is correct
   - Check `vercel.json` or `netlify.toml` files

3. **Slow loading:**
   - Enable build optimizations
   - Check image sizes
   - Use build analyzer to identify issues

## 💡 Pro Tips

1. **Free CDN:** Both Vercel and Netlify include free global CDN
2. **Auto-deploy:** Push to GitHub triggers automatic redeployment  
3. **Preview deployments:** Both platforms create preview URLs for testing
4. **Analytics:** Free basic analytics available on both platforms
5. **SSL:** HTTPS is automatic and free on both platforms

## 📞 Support

If you run into issues:

1. Check the browser console for errors
2. Verify all files were copied correctly  
3. Ensure environment variables are set
4. Test locally first with `npm run dev`

Your portfolio should now be live and exactly matching your Figma Make version! 🎉