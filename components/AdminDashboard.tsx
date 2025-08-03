import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  FileText, 
  Mail, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  LogOut,
  Home,
  MessageSquare,
  Star,
  HelpCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminUser {
  id: string;
  email: string;
}

interface DashboardStats {
  projects: number;
  testimonials: number;
  faqs: number;
  totalInquiries: number;
  unreadInquiries: number;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: 'new' | 'in-progress' | 'completed' | 'archived';
  timestamp: string;
  read: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    testimonials: 0,
    faqs: 0,
    totalInquiries: 0,
    unreadInquiries: 0
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6d511892`;

  // Authentication functions
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        toast.success('Login successful!');
        fetchDashboardData();
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    toast.success('Logged out successfully');
  };

  // API functions
  const apiCall = async (endpoint: string, options: any = {}) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'API call failed');
    }
    return data;
  };

  const fetchDashboardData = async () => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      const [dashboardData, portfolioData] = await Promise.all([
        apiCall('/admin/dashboard'),
        apiCall('/portfolio')
      ]);

      setStats(dashboardData.stats);
      setInquiries(dashboardData.recentInquiries || []);
      setProjects(portfolioData.projects || []);
      setTestimonials(portfolioData.testimonials || []);
      setFAQs(portfolioData.faqs || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (type: string, item: any) => {
    try {
      setLoading(true);
      const endpoint = `/admin/${type}${item.id && !item.id.includes('new') ? `/${item.id}` : ''}`;
      const method = item.id && !item.id.includes('new') ? 'PUT' : 'POST';
      
      await apiCall(endpoint, {
        method,
        body: JSON.stringify(item)
      });

      toast.success(`${type.slice(0, -1)} saved successfully!`);
      setShowEditDialog(false);
      setEditingItem(null);
      fetchDashboardData();
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      toast.error(`Failed to save ${type.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await apiCall(`/admin/${type}/${id}`, { method: 'DELETE' });
      toast.success('Item deleted successfully!');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const updateInquiryStatus = async (id: string, updates: Partial<Inquiry>) => {
    try {
      await apiCall(`/admin/inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      toast.success('Inquiry updated successfully!');
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast.error('Failed to update inquiry');
    }
  };

  // Check for stored auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchDashboardData();
    }
  }, [accessToken]);

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                login(
                  formData.get('email') as string,
                  formData.get('password') as string
                );
              }} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="mnjewelps@gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold mb-6">Portfolio CMS</h1>
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'inquiries', label: 'Inquiries', icon: Mail },
                { id: 'projects', label: 'Projects', icon: FileText },
                { id: 'testimonials', label: 'Testimonials', icon: Star },
                { id: 'faqs', label: 'FAQs', icon: HelpCircle },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  {user.email[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{user.email}</div>
                </div>
              </div>
              <Button 
                onClick={logout} 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Dashboard</h2>
              
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">{stats.projects}</div>
                        <div className="text-gray-400">Projects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <div>
                        <div className="text-2xl font-bold">{stats.testimonials}</div>
                        <div className="text-gray-400">Testimonials</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <HelpCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">{stats.faqs}</div>
                        <div className="text-gray-400">FAQs</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Mail className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                        <div className="text-gray-400">Total Inquiries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                      <div>
                        <div className="text-2xl font-bold">{stats.unreadInquiries}</div>
                        <div className="text-gray-400">Unread</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent inquiries */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 5).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{inquiry.name}</span>
                            <Badge variant={inquiry.read ? 'secondary' : 'destructive'}>
                              {inquiry.read ? 'Read' : 'Unread'}
                            </Badge>
                            <Badge variant="outline">{inquiry.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-400">{inquiry.email} • {inquiry.subject}</div>
                          <div className="text-xs text-gray-500">{new Date(inquiry.timestamp).toLocaleString()}</div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => updateInquiryStatus(inquiry.id, { read: true })}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Inquiries</h2>
                <Button onClick={fetchDashboardData} disabled={loading}>
                  Refresh
                </Button>
              </div>
              
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                            <Badge variant={inquiry.read ? 'secondary' : 'destructive'}>
                              {inquiry.read ? 'Read' : 'Unread'}
                            </Badge>
                            <Badge variant="outline">{inquiry.status}</Badge>
                          </div>
                          <div className="text-gray-400">{inquiry.email}</div>
                          <div className="text-sm text-gray-500">{new Date(inquiry.timestamp).toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={inquiry.status}
                            onValueChange={(status) => updateInquiryStatus(inquiry.id, { status: status as any, read: true })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div><strong>Subject:</strong> {inquiry.subject}</div>
                        <div><strong>Project Type:</strong> {inquiry.projectType}</div>
                        <div><strong>Budget:</strong> {inquiry.budget}</div>
                        <div><strong>Timeline:</strong> {inquiry.timeline}</div>
                        <div><strong>Message:</strong></div>
                        <div className="bg-gray-800 p-3 rounded-lg text-sm">{inquiry.message}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Projects</h2>
                <Button 
                  onClick={() => {
                    setEditingItem({
                      id: 'new-project',
                      title: '',
                      description: '',
                      longDescription: '',
                      tech: [],
                      category: '',
                      year: new Date().getFullYear().toString(),
                      featured: false
                    });
                    setShowEditDialog(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              <div className="grid gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            {project.featured && <Badge>Featured</Badge>}
                            <Badge variant="outline">{project.category}</Badge>
                          </div>
                          <p className="text-gray-400 mb-2">{project.description}</p>
                          <div className="text-sm text-gray-500">
                            {project.year} • {project.tech?.join(', ')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(project);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteItem('projects', project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Similar layouts for testimonials and FAQs would go here */}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id?.includes('new') ? 'Add' : 'Edit'} {
                currentTab === 'projects' ? 'Project' :
                currentTab === 'testimonials' ? 'Testimonial' :
                currentTab === 'faqs' ? 'FAQ' : 'Item'
              }
            </DialogTitle>
          </DialogHeader>
          
          {editingItem && currentTab === 'projects' && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Long Description</Label>
                <Textarea
                  value={editingItem.longDescription}
                  onChange={(e) => setEditingItem({...editingItem, longDescription: e.target.value})}
                  className="bg-gray-800 border-gray-700"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({...editingItem, year: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div>
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={editingItem.tech?.join(', ') || ''}
                  onChange={(e) => setEditingItem({...editingItem, tech: e.target.value.split(', ').filter(Boolean)})}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={() => saveItem('projects', editingItem)} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}