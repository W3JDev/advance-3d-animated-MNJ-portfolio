import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to verify admin authentication
async function verifyAdmin(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return null;
    }
    
    // Check if user is admin
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'mnjewelps@gmail.com';
    if (user.email !== adminEmail) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

// Auth middleware for admin routes
async function requireAdmin(c: any, next: any) {
  const user = await verifyAdmin(c);
  if (!user) {
    return c.json({ error: 'Unauthorized - Admin access required' }, 401);
  }
  c.set('user', user);
  await next();
}

// Health check endpoint
app.get("/make-server-6d511892/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// Admin signup (one-time setup)
app.post("/make-server-6d511892/auth/setup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    // Check if this is the admin email
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'mnjewelps@gmail.com';
    if (email !== adminEmail) {
      return c.json({ error: 'Only admin can create account' }, 403);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since no email server configured
    });

    if (error) {
      console.error('Admin setup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: 'Admin account created successfully', 
      user: { id: data.user?.id, email: data.user?.email } 
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    return c.json({ error: 'Failed to create admin account' }, 500);
  }
});

// Admin login
app.post("/make-server-6d511892/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    return c.json({ 
      message: 'Login successful',
      access_token: data.session?.access_token,
      user: { id: data.user?.id, email: data.user?.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// =============================================================================
// PORTFOLIO CONTENT ROUTES (Public)
// =============================================================================

// Get all portfolio content
app.get("/make-server-6d511892/portfolio", async (c) => {
  try {
    const [projects, testimonials, faqs, settings, about] = await Promise.all([
      kv.getByPrefix('projects:'),
      kv.getByPrefix('testimonials:'),
      kv.getByPrefix('faqs:'),
      kv.get('settings'),
      kv.get('about')
    ]);

    return c.json({
      projects: projects || [],
      testimonials: testimonials || [],
      faqs: faqs || [],
      settings: settings || {},
      about: about || {}
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return c.json({ error: 'Failed to fetch portfolio data' }, 500);
  }
});

// Get projects
app.get("/make-server-6d511892/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix('projects:');
    return c.json({ projects: projects || [] });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Get testimonials
app.get("/make-server-6d511892/testimonials", async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonials:');
    return c.json({ testimonials: testimonials || [] });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return c.json({ error: 'Failed to fetch testimonials' }, 500);
  }
});

// Get FAQs
app.get("/make-server-6d511892/faqs", async (c) => {
  try {
    const faqs = await kv.getByPrefix('faqs:');
    return c.json({ faqs: faqs || [] });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return c.json({ error: 'Failed to fetch FAQs' }, 500);
  }
});

// Get general settings
app.get("/make-server-6d511892/settings", async (c) => {
  try {
    const settings = await kv.get('settings');
    return c.json({ settings: settings || {} });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

// =============================================================================
// CONTACT & MESSAGING ROUTES (Public)
// =============================================================================

// Submit contact inquiry
app.post("/make-server-6d511892/contact", async (c) => {
  try {
    const { name, email, subject, message, projectType, budget, timeline } = await c.req.json();

    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400);
    }

    const inquiryId = `inquiry:${Date.now()}:${Math.random().toString(36).substring(2)}`;
    const inquiry = {
      id: inquiryId,
      name,
      email,
      subject: subject || 'New Portfolio Inquiry',
      message,
      projectType: projectType || 'general',
      budget: budget || 'not-specified',
      timeline: timeline || 'flexible',
      status: 'new',
      timestamp: new Date().toISOString(),
      read: false
    };

    await kv.set(inquiryId, inquiry);

    // Store in recent inquiries for admin dashboard
    const recentInquiries = await kv.get('recent_inquiries') || [];
    recentInquiries.unshift(inquiry);
    // Keep only last 50 inquiries in recent list
    await kv.set('recent_inquiries', recentInquiries.slice(0, 50));

    // Send notification (in a real app, you'd use email service)
    console.log(`New inquiry from ${name} (${email}): ${subject}`);

    return c.json({ 
      message: 'Inquiry submitted successfully! I\'ll get back to you within 24 hours.',
      inquiryId: inquiryId
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return c.json({ error: 'Failed to submit inquiry' }, 500);
  }
});

// Get contact status
app.get("/make-server-6d511892/contact/:inquiryId", async (c) => {
  try {
    const inquiryId = c.req.param('inquiryId');
    const inquiry = await kv.get(inquiryId);
    
    if (!inquiry) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }

    return c.json({ 
      status: inquiry.status,
      timestamp: inquiry.timestamp,
      message: 'Inquiry received and being processed'
    });
  } catch (error) {
    console.error('Error fetching inquiry status:', error);
    return c.json({ error: 'Failed to fetch inquiry status' }, 500);
  }
});

// =============================================================================
// ADMIN CMS ROUTES (Protected)
// =============================================================================

// Admin dashboard stats
app.get("/make-server-6d511892/admin/dashboard", requireAdmin, async (c) => {
  try {
    const [projects, testimonials, faqs, inquiries] = await Promise.all([
      kv.getByPrefix('projects:'),
      kv.getByPrefix('testimonials:'),
      kv.getByPrefix('faqs:'),
      kv.getByPrefix('inquiry:')
    ]);

    const recentInquiries = await kv.get('recent_inquiries') || [];
    const unreadInquiries = recentInquiries.filter(inq => !inq.read);

    return c.json({
      stats: {
        projects: projects.length,
        testimonials: testimonials.length,
        faqs: faqs.length,
        totalInquiries: inquiries.length,
        unreadInquiries: unreadInquiries.length
      },
      recentInquiries: recentInquiries.slice(0, 10)
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Manage Projects
app.post("/make-server-6d511892/admin/projects", requireAdmin, async (c) => {
  try {
    const project = await c.req.json();
    const projectId = `projects:${project.id || Date.now()}`;
    
    await kv.set(projectId, {
      ...project,
      id: projectId,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'Project saved successfully', id: projectId });
  } catch (error) {
    console.error('Error saving project:', error);
    return c.json({ error: 'Failed to save project' }, 500);
  }
});

app.put("/make-server-6d511892/admin/projects/:id", requireAdmin, async (c) => {
  try {
    const projectId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(projectId);
    if (!existing) {
      return c.json({ error: 'Project not found' }, 404);
    }

    await kv.set(projectId, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

app.delete("/make-server-6d511892/admin/projects/:id", requireAdmin, async (c) => {
  try {
    const projectId = c.req.param('id');
    await kv.del(projectId);
    return c.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// Manage Testimonials
app.post("/make-server-6d511892/admin/testimonials", requireAdmin, async (c) => {
  try {
    const testimonial = await c.req.json();
    const testimonialId = `testimonials:${testimonial.id || Date.now()}`;
    
    await kv.set(testimonialId, {
      ...testimonial,
      id: testimonialId,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'Testimonial saved successfully', id: testimonialId });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return c.json({ error: 'Failed to save testimonial' }, 500);
  }
});

app.put("/make-server-6d511892/admin/testimonials/:id", requireAdmin, async (c) => {
  try {
    const testimonialId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(testimonialId);
    if (!existing) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }

    await kv.set(testimonialId, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return c.json({ error: 'Failed to update testimonial' }, 500);
  }
});

app.delete("/make-server-6d511892/admin/testimonials/:id", requireAdmin, async (c) => {
  try {
    const testimonialId = c.req.param('id');
    await kv.del(testimonialId);
    return c.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return c.json({ error: 'Failed to delete testimonial' }, 500);
  }
});

// Manage FAQs
app.post("/make-server-6d511892/admin/faqs", requireAdmin, async (c) => {
  try {
    const faq = await c.req.json();
    const faqId = `faqs:${faq.id || Date.now()}`;
    
    await kv.set(faqId, {
      ...faq,
      id: faqId,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'FAQ saved successfully', id: faqId });
  } catch (error) {
    console.error('Error saving FAQ:', error);
    return c.json({ error: 'Failed to save FAQ' }, 500);
  }
});

app.put("/make-server-6d511892/admin/faqs/:id", requireAdmin, async (c) => {
  try {
    const faqId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(faqId);
    if (!existing) {
      return c.json({ error: 'FAQ not found' }, 404);
    }

    await kv.set(faqId, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'FAQ updated successfully' });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return c.json({ error: 'Failed to update FAQ' }, 500);
  }
});

app.delete("/make-server-6d511892/admin/faqs/:id", requireAdmin, async (c) => {
  try {
    const faqId = c.req.param('id');
    await kv.del(faqId);
    return c.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return c.json({ error: 'Failed to delete FAQ' }, 500);
  }
});

// Inquiry Management
app.get("/make-server-6d511892/admin/inquiries", requireAdmin, async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const status = c.req.query('status');

    let inquiries = await kv.getByPrefix('inquiry:');
    
    // Filter by status if provided
    if (status && status !== 'all') {
      inquiries = inquiries.filter(inq => inq.status === status);
    }

    // Sort by timestamp (newest first)
    inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Pagination
    const start = (page - 1) * limit;
    const paginatedInquiries = inquiries.slice(start, start + limit);

    return c.json({
      inquiries: paginatedInquiries,
      pagination: {
        total: inquiries.length,
        page,
        limit,
        totalPages: Math.ceil(inquiries.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return c.json({ error: 'Failed to fetch inquiries' }, 500);
  }
});

app.put("/make-server-6d511892/admin/inquiries/:id", requireAdmin, async (c) => {
  try {
    const inquiryId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(inquiryId);
    if (!existing) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(inquiryId, updated);

    // Update recent inquiries list
    const recentInquiries = await kv.get('recent_inquiries') || [];
    const index = recentInquiries.findIndex(inq => inq.id === inquiryId);
    if (index >= 0) {
      recentInquiries[index] = updated;
      await kv.set('recent_inquiries', recentInquiries);
    }

    return c.json({ message: 'Inquiry updated successfully' });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return c.json({ error: 'Failed to update inquiry' }, 500);
  }
});

// Settings Management
app.get("/make-server-6d511892/admin/settings", requireAdmin, async (c) => {
  try {
    const settings = await kv.get('settings') || {};
    return c.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

app.put("/make-server-6d511892/admin/settings", requireAdmin, async (c) => {
  try {
    const settings = await c.req.json();
    await kv.set('settings', {
      ...settings,
      updatedAt: new Date().toISOString()
    });

    return c.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// Bulk operations
app.post("/make-server-6d511892/admin/init-default-data", requireAdmin, async (c) => {
  try {
    // Initialize with current hardcoded data
    const defaultData = {
      settings: {
        siteName: 'MN Jewel Portfolio',
        tagline: 'AI Full-Stack Developer | F&B Expert | Malaysia',
        email: 'mnjewelps@gmail.com',
        location: 'Malaysia',
        company: 'w3j LLC',
        linkedin: 'https://www.linkedin.com/in/mn-jewel',
        github: 'https://github.com/W3JDev',
        portfolio: 'https://bento.me/mnj',
        phone: null,
        bio: 'Full-Stack AI Developer at w3j LLC. Transforming Malaysian hospitality and global businesses through intelligent automation. 11+ years of F&B expertise meets cutting-edge technology.',
        availability: true,
        skills: ['Python', 'React', 'AI/ML', 'Node.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
        experience: '11+ years',
        roiImpact: '300%'
      }
    };

    await kv.set('settings', defaultData.settings);
    
    return c.json({ message: 'Default data initialized successfully' });
  } catch (error) {
    console.error('Error initializing default data:', error);
    return c.json({ error: 'Failed to initialize default data' }, 500);
  }
});

console.log('🚀 Portfolio CMS Server initialized with authentication and full CRUD operations');

Deno.serve(app.fetch);