import { useEffect } from 'react';
import { supabaseUtils, checkSupabaseConfig } from '../utils/supabase/client';

interface ProjectAnalyticsProps {
  projectName: string;
  projectId?: string;
}

export function ProjectAnalytics({ projectName, projectId }: ProjectAnalyticsProps) {
  useEffect(() => {
    const trackView = async () => {
      if (!checkSupabaseConfig()) return;
      
      try {
        // Get basic visitor info (without tracking personal data)
        const visitorInfo = {
          project_name: projectName,
          visitor_id: projectId || generateVisitorId(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || undefined,
        };

        await supabaseUtils.trackProjectView(visitorInfo);
      } catch (error) {
        // Silently fail - analytics shouldn't break the user experience
        console.debug('Analytics tracking failed:', error);
      }
    };

    // Track view after a short delay to ensure the component is properly mounted
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [projectName, projectId]);

  return null; // This component doesn't render anything
}

// Generate a simple session-based visitor ID (not persistent)
function generateVisitorId(): string {
  if (typeof window === 'undefined') return 'server';
  
  // Check if we already have a session ID
  let sessionId = sessionStorage.getItem('visitor_session_id');
  
  if (!sessionId) {
    // Create a simple random session ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  
  return sessionId;
}

export default ProjectAnalytics;
