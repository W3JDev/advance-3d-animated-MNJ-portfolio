# MN Jewel Portfolio - Supabase Setup Guide

## 🚀 Supabase Integration Complete!

Your portfolio now includes full Supabase integration for:
- **Contact Form Storage**: All contact submissions are saved to your database
- **Project Analytics**: Track which projects visitors are viewing
- **Newsletter Subscriptions**: Manage email subscribers
- **Admin Dashboard**: View all analytics and manage contacts

## 📋 Setup Instructions

### 1. Supabase Project Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Go to Settings > API to get your credentials

### 2. Environment Variables
Create a `.env.local` file with your Supabase credentials:

```bash
# Copy from your Supabase project settings
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Site configuration
VITE_SITE_NAME=MN Jewel Portfolio
VITE_SITE_DESCRIPTION=Full-Stack AI Developer specializing in F&B automation
VITE_SITE_URL=https://your-domain.vercel.app
VITE_CONTACT_EMAIL=mnjewelps@gmail.com
```

### 3. Database Setup
1. In your Supabase project, go to the SQL Editor
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the SQL to create all necessary tables and functions

### 4. Vercel Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Add the same environment variables from your `.env.local`
3. Redeploy your project

## 🔧 Features Added

### Contact Form Enhancement
- ✅ Automatic database storage of all submissions
- ✅ Fallback to static method if Supabase is unavailable
- ✅ Better error handling and user feedback

### Project Analytics
- ✅ Automatic tracking of project views (anonymous)
- ✅ Session-based visitor identification (privacy-friendly)
- ✅ Analytics viewable in admin dashboard

### Newsletter System
- ✅ Email collection with optional name
- ✅ Duplicate email handling
- ✅ Unsubscribe functionality (database-level)

### Admin Dashboard
- ✅ View all contact submissions with status tracking
- ✅ Project view analytics and popular projects
- ✅ Newsletter subscriber management
- ✅ Database connection status

## 🛠️ Database Tables Created

1. **contact_submissions** - Store contact form data
2. **project_views** - Anonymous project analytics
3. **newsletter_subscriptions** - Email subscribers

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Anonymous submissions** allowed for contact forms and analytics
- **Authenticated access required** for viewing admin data
- **No personal data** stored in analytics (session-based only)

## 🎯 Next Steps

1. **Set up your Supabase project** using the instructions above
2. **Deploy to production** with environment variables
3. **Test the contact form** to ensure everything works
4. **Access admin dashboard** at `/admin` (if implemented)

## 📊 Analytics Privacy

The analytics system is designed to be privacy-friendly:
- No personal information stored
- Session-based tracking only
- No persistent user identification
- Compliant with privacy regulations

---

**Need help?** Check the Supabase documentation or the troubleshooting section below.

## 🐛 Troubleshooting

### "Supabase is not configured" error
- Ensure your environment variables are set correctly
- Check that your Supabase URL ends with `.supabase.co`
- Verify your anon key is correct

### Contact form not saving to database
- Check your Row Level Security policies
- Ensure the contact_submissions table exists
- Verify your Supabase project is active

### Analytics not working
- Analytics fail silently to not break user experience
- Check browser console for debug messages
- Ensure project_views table exists with proper schema
