-- Enable Row Level Security (RLS) for all tables
-- This ensures data privacy and security

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    project_type TEXT,
    budget_range TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project views for analytics
CREATE TABLE IF NOT EXISTS project_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_name TEXT NOT NULL,
    visitor_id TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Contact submissions: Allow insert for everyone, select/update/delete for authenticated users only
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact submissions" ON contact_submissions
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can update contact submissions" ON contact_submissions
    FOR UPDATE TO authenticated
    USING (true);

-- Project views: Allow insert for everyone (for analytics), select for authenticated users only
CREATE POLICY "Anyone can track project views" ON project_views
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics" ON project_views
    FOR SELECT TO authenticated
    USING (true);

-- Newsletter subscriptions: Allow insert/update for everyone, select/delete for authenticated users only
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Anyone can update their newsletter subscription" ON newsletter_subscriptions
    FOR UPDATE TO anon, authenticated
    USING (true);

CREATE POLICY "Authenticated users can view newsletter subscriptions" ON newsletter_subscriptions
    FOR SELECT TO authenticated
    USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_project_views_created_at ON project_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_views_project_name ON project_views(project_name);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);

-- Functions for analytics (optional but useful)

-- Function to get contact form submissions count by status
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE(status TEXT, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cs.status,
        COUNT(*) as count
    FROM contact_submissions cs
    GROUP BY cs.status
    ORDER BY cs.status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get popular projects (most viewed)
CREATE OR REPLACE FUNCTION get_popular_projects(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(project_name TEXT, view_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pv.project_name,
        COUNT(*) as view_count
    FROM project_views pv
    GROUP BY pv.project_name
    ORDER BY view_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent activity summary
CREATE OR REPLACE FUNCTION get_recent_activity()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'recent_contacts', (
            SELECT COUNT(*) 
            FROM contact_submissions 
            WHERE created_at > NOW() - INTERVAL '7 days'
        ),
        'recent_views', (
            SELECT COUNT(*) 
            FROM project_views 
            WHERE created_at > NOW() - INTERVAL '7 days'
        ),
        'new_subscribers', (
            SELECT COUNT(*) 
            FROM newsletter_subscriptions 
            WHERE subscribed_at > NOW() - INTERVAL '7 days'
        ),
        'total_contacts', (SELECT COUNT(*) FROM contact_submissions),
        'total_views', (SELECT COUNT(*) FROM project_views),
        'total_subscribers', (
            SELECT COUNT(*) 
            FROM newsletter_subscriptions 
            WHERE status = 'active'
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
