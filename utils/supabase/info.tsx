// Supabase configuration with safe environment variable handling
function getEnvVar(key: string, fallback = ''): string {
  try {
    // Simple check for Vite environment variables
    if (import.meta?.env?.[key]) {
      return import.meta.env[key];
    }
    
    // Fallback to provided default
    return fallback;
  } catch {
    // Return fallback if any error occurs
    return fallback;
  }
}

// Extract project ID from Supabase URL safely
function extractProjectId(url: string): string {
  try {
    if (!url) return 'local-dev';
    const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
    return match ? match[1] : 'local-dev';
  } catch {
    return 'local-dev';
  }
}

// Get Supabase configuration with safe defaults
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', '');
const anonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', '');

export const projectId = extractProjectId(supabaseUrl);
export const publicAnonKey = anonKey;

// Site configuration
export const siteConfig = {
  name: getEnvVar('VITE_SITE_NAME', 'MN Jewel Portfolio'),
  description: getEnvVar('VITE_SITE_DESCRIPTION', 'Full-Stack AI Developer specializing in F&B automation and intelligent systems'),
  url: getEnvVar('VITE_SITE_URL', 'https://localhost:3000'),
  email: getEnvVar('VITE_CONTACT_EMAIL', 'mnjewelps@gmail.com')
};

// Utility functions
export function isSupabaseConfigured(): boolean {
  return supabaseUrl.length > 0 && anonKey.length > 0 && supabaseUrl.includes('supabase.co');
}

export function getSupabaseUrl(): string {
  return supabaseUrl;
}

export function getAnonKey(): string {
  return anonKey;
}

// Environment detection
export const isDevelopment = getEnvVar('NODE_ENV', 'development') === 'development';
export const isProduction = getEnvVar('NODE_ENV', 'development') === 'production';

// Debug logging for development
console.log('🔧 Supabase Config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!anonKey,
  projectId,
  configured: isSupabaseConfigured()
});