import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create Supabase client only if properly configured
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
}) : null

// Configuration check helper
export const checkSupabaseConfig = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co')
}

// Database table types (will be updated based on your schema)
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  message: string
  project_type?: string
  budget_range?: string
  timeline?: string
  created_at?: string
  status?: 'new' | 'contacted' | 'in_progress' | 'completed'
}

export interface ProjectView {
  id?: string
  project_name: string
  visitor_id?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  created_at?: string
}

export interface NewsletterSubscription {
  id?: string
  email: string
  name?: string
  subscribed_at?: string
  status?: 'active' | 'unsubscribed'
}

// Utility functions for common operations
export const supabaseUtils = {
  // Contact form submission
  submitContactForm: async (data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured - contact form submission skipped')
        return { success: false, error: new Error('Supabase not configured') }
      }

      const { data: result, error } = await supabase
        .from('contact_submissions')
        .insert([{ ...data, status: 'new' }])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      return { success: false, error: error as Error }
    }
  },

  // Track project views for analytics
  trackProjectView: async (data: Omit<ProjectView, 'id' | 'created_at'>) => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured - project view tracking skipped')
        return { success: false, error: new Error('Supabase not configured') }
      }

      const { error } = await supabase
        .from('project_views')
        .insert([data])

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error tracking project view:', error)
      return { success: false, error: error as Error }
    }
  },

  // Newsletter subscription
  subscribeNewsletter: async (email: string, name?: string) => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured - newsletter subscription skipped')
        return { success: false, error: new Error('Supabase not configured') }
      }

      const { data: result, error } = await supabase
        .from('newsletter_subscriptions')
        .upsert([{ email, name, status: 'active' }], { onConflict: 'email' })
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      return { success: false, error: error as Error }
    }
  },

  // Get analytics data (for admin dashboard)
  getAnalytics: async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured - analytics unavailable')
        return { 
          success: false, 
          error: new Error('Supabase not configured'),
          data: { contacts: [], views: [], subscribers: [] }
        }
      }

      const [contactsResult, viewsResult, subscribersResult] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('project_views').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_subscriptions').select('*').eq('status', 'active')
      ])

      return {
        success: true,
        data: {
          contacts: contactsResult.data || [],
          views: viewsResult.data || [],
          subscribers: subscribersResult.data || []
        }
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return { 
        success: false, 
        error: error as Error,
        data: { contacts: [], views: [], subscribers: [] }
      }
    }
  }
}

export default supabase
