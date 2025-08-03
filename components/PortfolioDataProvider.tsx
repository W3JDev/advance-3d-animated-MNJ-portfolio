import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey, isSupabaseConfigured } from '../utils/supabase/info';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  tech: string[];
  category: string;
  year: string;
  duration?: string;
  teamSize?: string;
  gradient: string;
  stats?: Array<{ metric: string; value: string }>;
  features?: string[];
  impact?: {
    business: string;
    technical: string;
    user: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  featured?: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

interface Settings {
  siteName?: string;
  tagline?: string;
  email?: string;
  location?: string;
  company?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  phone?: string;
  bio?: string;
  availability?: boolean;
  skills?: string[];
  experience?: string;
  roiImpact?: string;
}

interface AboutInfo {
  bio?: string;
  experience?: string;
  achievements?: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  education?: Array<{
    year: string;
    degree: string;
    institution: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

interface PortfolioData {
  projects: Project[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  settings: Settings;
  about: AboutInfo;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioData | undefined>(undefined);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};

interface PortfolioDataProviderProps {
  children: ReactNode;
  fallbackData?: {
    projects?: Project[];
    testimonials?: Testimonial[];
    faqs?: FAQ[];
    settings?: Settings;
    about?: AboutInfo;
  };
}

export function PortfolioDataProvider({ children, fallbackData }: PortfolioDataProviderProps) {
  // Initialize with fallback data immediately
  const [data, setData] = useState<{
    projects: Project[];
    testimonials: Testimonial[];
    faqs: FAQ[];
    settings: Settings;
    about: AboutInfo;
  }>({
    projects: fallbackData?.projects || [],
    testimonials: fallbackData?.testimonials || [],
    faqs: fallbackData?.faqs || [],
    settings: fallbackData?.settings || {},
    about: fallbackData?.about || {}
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // Skip if Supabase is not configured
    if (!isSupabaseConfigured()) {
      console.log('📝 Supabase not configured, using fallback data');
      setError('Using static data - Supabase not configured');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6d511892`;
      
      const response = await fetch(`${API_BASE}/portfolio`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const portfolioData = await response.json();
      
      // Only update if we have valid data
      if (portfolioData.projects && Array.isArray(portfolioData.projects) && portfolioData.projects.length > 0) {
        setData({
          projects: portfolioData.projects,
          testimonials: portfolioData.testimonials || fallbackData?.testimonials || [],
          faqs: portfolioData.faqs || fallbackData?.faqs || [],
          settings: { ...fallbackData?.settings, ...portfolioData.settings },
          about: { ...fallbackData?.about, ...portfolioData.about }
        });
        console.log('✅ Portfolio data updated from CMS');
      }

    } catch (err) {
      console.warn('⚠️ CMS fetch failed, using fallback data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Try to fetch data after mount, but don't block initial render
  useEffect(() => {
    if (isSupabaseConfigured()) {
      const timer = setTimeout(() => {
        fetchData();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const contextValue: PortfolioData = {
    ...data,
    loading,
    error,
    refreshData: fetchData
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Contact form hook
export function useContactForm() {
  const [loading, setLoading] = useState(false);

  const submitInquiry = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
  }) => {
    if (!isSupabaseConfigured()) {
      console.log('📧 Contact form demo submission:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, inquiryId: 'demo-' + Date.now(), message: 'Demo submission successful' };
    }

    setLoading(true);
    try {
      const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6d511892`;
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      return { success: true, inquiryId: data.inquiryId, message: data.message };
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { submitInquiry, loading };
}