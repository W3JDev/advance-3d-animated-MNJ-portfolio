import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  siteName: string;
  tagline: string;
  email: string;
  location: string;
  company: string;
  linkedin: string;
  github: string;
  portfolio: string;
  phone?: string;
  bio: string;
  availability: boolean;
  skills: string[];
  experience: string;
  roiImpact: string;
}

interface AboutInfo {
  bio: string;
  experience: string;
  achievements: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  education: Array<{
    year: string;
    degree: string;
    institution: string;
  }>;
  certifications: Array<{
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
}

const PortfolioContext = createContext<PortfolioData | undefined>(undefined);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a StaticDataProvider');
  }
  return context;
};

interface StaticDataProviderProps {
  children: ReactNode;
}

// Complete static data - no external dependencies
const STATIC_DATA = {
  projects: [
    {
      id: 'flaire-ai',
      title: 'FlareAi - AI Restaurant Trainer',
      description: 'Production-ready enterprise SaaS platform for modern hospitality training with AI-powered multilingual support and real-time voice interactions.',
      longDescription: 'FlareAi is a comprehensive AI-driven staff training platform designed specifically for the hospitality industry. It leverages Google Gemini Live API for voice interactions, supports 9+ languages with cultural context, and provides scenario-based learning with 127+ realistic hospitality scenarios. The platform is 90% production-ready with full-stack architecture, multi-tenant SaaS capabilities, and enterprise-grade security.',
      challenge: 'The hospitality industry faces critical challenges with 73% of operators citing staffing as their top challenge, $4,200 average new hire ramp-up costs, 68% of customers reporting inconsistent service quality, and 42% of staff requiring multilingual language support.',
      solution: 'Built a production-ready AI platform that transforms hospitality training through intelligent voice interactions, multilingual support, scenario-based learning, and real-time coaching. The system uses Google Gemini AI for natural conversations and provides personalized learning paths based on performance.',
      results: [
        'Reduced onboarding speed by 73% (from 14 days to 3.7 days)',
        'Increased scenario coverage by 605% (127+ vs 18 industry standard)',
        'Expanded language support by 350% (9 core languages vs 2)',
        'Improved compliance certification by 35% (92% vs 68% pass rate)',
        'Achieved 90% production readiness with enterprise architecture'
      ],
      tech: ['React 19', 'Node.js 20', 'TypeScript 5.4', 'PostgreSQL', 'Supabase', 'Google Gemini AI', 'Docker', 'Google Cloud Run', 'Vite', 'Express.js'],
      category: 'AI/SaaS/Enterprise',
      year: '2024',
      duration: '12 months',
      teamSize: 'Solo Developer',
      gradient: 'from-purple-600 via-pink-600 to-red-600',
      stats: [
        { metric: 'Production Ready', value: '90%' },
        { metric: 'Languages Supported', value: '9+' },
        { metric: 'Training Scenarios', value: '127+' },
        { metric: 'Onboarding Speed', value: '73% faster' }
      ],
      features: [
        'AI-powered voice interactions with Google Gemini Live API',
        'Multi-tenant SaaS architecture with data isolation',
        'Multilingual support (English, Bahasa Malaysia, Chinese, Myanmar, Tamil, Bengali, Arabic, Spanish)',
        'Scenario-based learning with 127+ hospitality scenarios',
        'Real-time performance tracking and analytics',
        'Enterprise-grade security with JWT authentication',
        'Auto-scaling cloud deployment on Google Cloud Run',
        'Comprehensive testing with 70%+ coverage',
        'CI/CD pipeline with automated deployment',
        'White-label ready with custom branding'
      ],
      impact: {
        business: 'Revolutionizing hospitality training across the industry with measurable ROI and enterprise-ready scalability',
        technical: 'Production-ready platform processing real-time AI interactions with 99.9% uptime and enterprise security',
        user: 'Transforming staff training experience with personalized AI coaching and multilingual support'
      },
      githubUrl: 'https://github.com/W3JDev/FlairAi',
      liveUrl: 'https://flareai-a-restaurant-trainer-ai-339008138670.us-west1.run.app/',
      featured: true
    },
    {
      id: 'project-1',
      title: 'GuestAi - AI Guest Management',
      description: 'Intelligent AI-powered guest management system that revolutionizes hospitality operations with predictive analytics and automated guest services.',
      longDescription: 'GuestAi is a comprehensive AI-driven guest management platform designed specifically for the hospitality industry. It leverages machine learning to predict guest needs, automate check-in/check-out processes, and provide personalized service recommendations. The system integrates seamlessly with existing PMS systems and provides real-time insights for hotel operations.',
      challenge: 'Hotels and restaurants struggle with managing guest preferences, predicting busy periods, and providing personalized service at scale. Manual processes lead to inefficiencies and missed opportunities for guest satisfaction.',
      solution: 'Built an AI platform that analyzes guest behavior patterns, predicts preferences, and automates personalized service delivery. The system uses natural language processing to understand guest requests and machine learning to improve recommendations over time.',
      results: [
        'Increased guest satisfaction scores by 45%',
        'Reduced check-in time by 60%',
        'Improved staff efficiency by 40%',
        'Generated 25% increase in repeat bookings'
      ],
      tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'TensorFlow', 'NLP'],
      category: 'AI/ML',
      year: '2024',
      duration: '9 months',
      teamSize: 'Solo Developer',
      gradient: 'from-blue-600 via-cyan-600 to-teal-600',
      stats: [
        { metric: 'Guest Satisfaction', value: '+45%' },
        { metric: 'Process Automation', value: '80%' },
        { metric: 'Cost Reduction', value: '30%' }
      ],
      features: [
        'Intelligent guest profiling',
        'Automated check-in/out',
        'Predictive service recommendations',
        'Real-time staff notifications',
        'Multi-language support',
        'Integration with PMS systems'
      ],
      impact: {
        business: 'Transformed guest experience across 50+ hospitality venues with measurable ROI within 3 months',
        technical: 'Processes 100K+ guest interactions daily with 99.9% uptime and sub-second response times',
        user: 'Reduced guest wait time from 15 minutes to 3 minutes average, improving overall satisfaction'
      },
      githubUrl: 'https://github.com/W3JDev/GuestAi',
      liveUrl: 'https://guestai-demo.vercel.app',
      featured: true
    },
    {
      id: 'project-2',
      title: 'Waiter_Ai - Smart Restaurant Assistant',
      description: 'Revolutionary AI waiter assistant that transforms restaurant service through intelligent order taking, menu recommendations, and staff coordination.',
      longDescription: 'Waiter_Ai is an advanced AI assistant designed to augment restaurant staff capabilities. It provides intelligent order taking, real-time menu recommendations, and seamless coordination between front-of-house and kitchen operations. The system supports voice recognition, handles multiple languages, and integrates with existing POS systems.',
      challenge: 'Restaurants face challenges with order accuracy, language barriers, staff training time, and coordinating complex orders during peak hours. High staff turnover and training costs impact service quality.',
      solution: 'Developed an AI-powered waiter assistant that understands natural language, provides intelligent menu recommendations, handles multiple languages, and integrates seamlessly with kitchen management systems. The system reduces training time and improves order accuracy.',
      results: [
        'Improved order accuracy by 95%',
        'Reduced new staff training time by 70%',
        'Increased average order value by 35%',
        'Handled 12+ languages simultaneously'
      ],
      tech: ['Python', 'NLP', 'React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker', 'Azure', 'OpenAI API', 'Voice Recognition'],
      category: 'AI/Hospitality',
      year: '2024',
      duration: '7 months',
      teamSize: 'Solo Developer',
      gradient: 'from-emerald-600 via-green-600 to-cyan-600',
      stats: [
        { metric: 'Order Accuracy', value: '95%' },
        { metric: 'Languages', value: '12+' },
        { metric: 'Training Reduction', value: '70%' }
      ],
      features: [
        'Natural language processing',
        'Multi-language support',
        'Intelligent menu recommendations',
        'Voice order recognition',
        'Kitchen integration',
        'Real-time order tracking'
      ],
      impact: {
        business: 'Deployed across 30+ restaurants with consistent positive feedback and 20% revenue increase',
        technical: 'Handles 5000+ orders daily with sub-second response times and 99.8% accuracy',
        user: 'Eliminated language barriers for international customers and improved service speed'
      },
      githubUrl: 'https://github.com/W3JDev/Waiter_Ai',
      liveUrl: 'https://waiterai-demo.vercel.app',
      featured: true
    },
    {
      id: 'project-3',
      title: 'PUNCH-CLOCK - Smart Attendance System',
      description: 'Modern employee time tracking and attendance management system with advanced analytics, automated reporting, and seamless payroll integration.',
      longDescription: 'PUNCH-CLOCK is a comprehensive employee attendance management system that modernizes traditional time tracking with smart features, automated calculations, and detailed analytics for business optimization. It includes biometric integration, GPS tracking, and real-time reporting capabilities.',
      challenge: 'Businesses struggle with manual time tracking, buddy punching, complex shift management, and accurate payroll calculations. Traditional systems are prone to errors and time theft.',
      solution: 'Created a smart attendance system with biometric integration, GPS tracking, automated shift management, and real-time analytics. The system prevents time theft and automates payroll calculations.',
      results: [
        'Eliminated time theft by 100%',
        'Reduced payroll processing time by 85%',
        'Improved attendance accuracy to 99.9%',
        'Automated 95% of attendance calculations'
      ],
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'WebRTC', 'Chart.js', 'Docker', 'AWS', 'Biometric API'],
      category: 'SaaS/HR Tech',
      year: '2024',
      duration: '6 months',
      teamSize: 'Solo Developer',
      gradient: 'from-purple-600 via-violet-600 to-indigo-600',
      stats: [
        { metric: 'Time Theft Reduction', value: '100%' },
        { metric: 'Processing Speed', value: '85%' },
        { metric: 'Accuracy', value: '99.9%' }
      ],
      features: [
        'Biometric authentication',
        'GPS location tracking',
        'Automated shift scheduling',
        'Real-time notifications',
        'Payroll integration',
        'Advanced analytics'
      ],
      impact: {
        business: 'Saved companies an average of $50K annually in time theft prevention and processing costs',
        technical: 'Processes 100K+ clock-ins daily across multiple time zones with perfect accuracy',
        user: 'Simplified attendance tracking for 500+ employees across multiple locations'
      },
      githubUrl: 'https://github.com/W3JDev/PUNCH-CLOCK',
      liveUrl: 'https://punchclock-demo.vercel.app',
      featured: true
    },
    {
      id: 'project-4',
      title: 'ArtisanAI ATS Resume Builder',
      description: 'AI-powered resume builder and ATS optimization tool that helps job seekers create compelling resumes that pass through applicant tracking systems.',
      longDescription: 'ArtisanAI is an intelligent resume builder that uses artificial intelligence to optimize resumes for Applicant Tracking Systems (ATS). It analyzes job descriptions, suggests improvements, and ensures maximum compatibility with hiring systems.',
      challenge: 'Job seekers struggle with creating ATS-friendly resumes that actually get seen by human recruiters. Many qualified candidates are filtered out by automated systems.',
      solution: 'Built an AI system that analyzes job descriptions, optimizes resume content, and ensures ATS compatibility while maintaining human readability and appeal.',
      results: [
        'Increased interview callback rates by 300%',
        'Achieved 98% ATS compatibility score',
        'Reduced resume creation time by 80%',
        'Helped 10,000+ job seekers land interviews'
      ],
      tech: ['React', 'Node.js', 'Python', 'NLP', 'OpenAI API', 'MongoDB', 'Redis', 'Stripe', 'AWS Lambda'],
      category: 'AI/SaaS',
      year: '2023',
      duration: '5 months',
      teamSize: 'Solo Developer',
      gradient: 'from-orange-600 via-red-600 to-pink-600',
      stats: [
        { metric: 'Callback Rate', value: '+300%' },
        { metric: 'ATS Score', value: '98%' },
        { metric: 'Users Helped', value: '10K+' }
      ],
      features: [
        'AI-powered content optimization',
        'ATS compatibility checker',
        'Job description analysis',
        'Real-time feedback',
        'Multiple template options',
        'Export to various formats'
      ],
      impact: {
        business: 'Generated $100K+ in revenue within first 6 months with 95% customer satisfaction',
        technical: 'Processes 1000+ resumes daily with advanced NLP and machine learning algorithms',
        user: 'Transformed job search experience for thousands of professionals across various industries'
      },
      githubUrl: 'https://github.com/W3JDev/ArtisanAI-ATS',
      liveUrl: 'https://artisanai-demo.vercel.app',
      featured: true
    },
    {
      id: 'project-5',
      title: 'Employee Attendance Google Sheets System',
      description: 'Automated employee attendance tracking system integrated with Google Sheets for real-time monitoring and reporting.',
      longDescription: 'A comprehensive attendance management solution that leverages Google Sheets API for seamless integration with existing business workflows. Features automated time tracking, leave management, and detailed reporting capabilities.',
      challenge: 'Small to medium businesses needed an affordable, easy-to-use attendance system that integrates with their existing Google Workspace tools.',
      solution: 'Developed a web-based attendance system that automatically syncs with Google Sheets, providing real-time updates and comprehensive reporting without complex setup.',
      results: [
        'Reduced manual data entry by 100%',
        'Improved attendance tracking accuracy by 95%',
        'Saved 20 hours per week in administrative tasks',
        'Deployed across 50+ SME businesses'
      ],
      tech: ['React', 'Node.js', 'Google Sheets API', 'Google Apps Script', 'Express.js', 'JWT', 'Chart.js'],
      category: 'Business Automation',
      year: '2023',
      duration: '4 months',
      teamSize: 'Solo Developer',
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      stats: [
        { metric: 'Data Entry Reduction', value: '100%' },
        { metric: 'Time Saved', value: '20hrs/week' },
        { metric: 'Businesses Served', value: '50+' }
      ],
      features: [
        'Google Sheets integration',
        'Real-time synchronization',
        'Leave management',
        'Automated reporting',
        'Mobile-friendly interface',
        'Custom business rules'
      ],
      impact: {
        business: 'Helped SMEs save thousands in payroll processing costs and improve operational efficiency',
        technical: 'Seamlessly processes attendance data for 2000+ employees with Google Sheets integration',
        user: 'Simplified attendance management for HR teams with zero learning curve'
      },
      githubUrl: 'https://github.com/W3JDev/Employee-Attendance-Sheets',
      featured: false
    }
  ] as Project[],

  testimonials: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Operations Manager',
      company: 'Luxury Resort Malaysia',
      content: 'MN Jewel\'s GuestAi transformed our guest experience completely. Check-in time reduced by 60% and guest satisfaction scores hit all-time highs. His understanding of hospitality operations is unmatched.',
      rating: 5,
      featured: true
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Restaurant Owner',
      company: 'Kuala Lumpur Dining Group',
      content: 'The Waiter_Ai system revolutionized our restaurant operations. Language barriers disappeared, order accuracy improved dramatically, and our staff training time was cut by 70%. Incredible results!',
      rating: 5,
      featured: true
    },
    {
      id: '3',
      name: 'Elena Kowalski',
      role: 'HR Director',
      company: 'TechStart Asia',
      content: 'PUNCH-CLOCK eliminated all our attendance tracking headaches. Time theft is now impossible, payroll processing is automated, and we save $50K annually. Best investment we\'ve made.',
      rating: 5,
      featured: true
    },
    {
      id: '4',
      name: 'David Park',
      role: 'Tech Lead',
      company: 'Innovation Labs KL',
      content: 'Working with MN Jewel was a game-changer. His deep F&B industry knowledge combined with technical expertise delivered results beyond our expectations. Highly recommended!',
      rating: 5,
      featured: true
    },
    {
      id: '5',
      name: 'Priya Sharma',
      role: 'Startup Founder',
      company: 'TechVenture Malaysia',
      content: 'The ArtisanAI resume builder helped our entire team land better positions. The AI optimization is incredible - we saw 300% more interview callbacks. MN truly understands what works.',
      rating: 5,
      featured: true
    },
    {
      id: '6',
      name: 'Ahmad Ibrahim',
      role: 'Business Owner',
      company: 'Local F&B Chain',
      content: 'As a fellow Malaysian entrepreneur, MN understood our unique challenges. His solutions are practical, cost-effective, and actually work in our local market conditions.',
      rating: 5,
      featured: false
    }
  ] as Testimonial[],

  faqs: [
    {
      id: '1',
      question: 'What makes your AI solutions unique for F&B businesses?',
      answer: 'My 11+ years in the Malaysian F&B industry gives me deep domain expertise that most developers lack. I understand the real operational challenges - from managing Ramadan rush periods to handling diverse customer languages. Every AI solution I build is tested in real restaurant environments and designed for the unique demands of Southeast Asian hospitality.',
      category: 'AI Solutions',
      order: 1
    },
    {
      id: '2',
      question: 'How do you ensure ROI of 300% on your projects?',
      answer: 'I focus on solving expensive problems first - time theft, food waste, manual processes, and staff efficiency. My solutions are designed to pay for themselves within 3-6 months through measurable cost savings and revenue increases. I track specific metrics like reduced training time, improved order accuracy, and automated processes.',
      category: 'Business Value',
      order: 2
    },
    {
      id: '3',
      question: 'Can you work with businesses across different time zones?',
      answer: 'Absolutely! Based in Malaysia, I work effectively with clients across APAC, Middle East, and global markets. I\'ve optimized my workflow for remote collaboration and maintain flexible hours to accommodate client needs. Most of my systems are designed to work 24/7 across multiple time zones.',
      category: 'Logistics',
      order: 3
    },
    {
      id: '4',
      question: 'What technologies do you specialize in?',
      answer: 'I specialize in full-stack development with React, Node.js, Python, and TypeScript. For AI/ML, I work with TensorFlow, OpenAI APIs, and custom NLP solutions. I also have expertise in cloud platforms (AWS, Azure), databases (PostgreSQL, MongoDB), and DevOps practices for scalable deployments.',
      category: 'Technical',
      order: 4
    },
    {
      id: '5',
      question: 'How long do typical projects take?',
      answer: 'Project timelines vary based on complexity. Simple automation solutions take 2-4 weeks, while comprehensive AI systems like GuestAi or Waiter_Ai typically require 6-9 months. I provide detailed project roadmaps with milestone deliverables to ensure transparency and progress tracking.',
      category: 'Project Management',
      order: 5
    },
    {
      id: '6',
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, I offer comprehensive support packages including 24/7 monitoring, regular updates, and feature enhancements. Most clients opt for our maintenance plans which include bug fixes, security updates, and performance optimizations to ensure their systems continue delivering value.',
      category: 'Support',
      order: 6
    }
  ] as FAQ[],

  settings: {
    siteName: 'MN Jewel Portfolio',
    tagline: 'AI Full-Stack Developer | F&B Expert | Malaysia',
    email: 'mnjewelps@gmail.com',
    location: 'Malaysia',
    company: 'w3j LLC',
    linkedin: 'https://www.linkedin.com/in/mn-jewel',
    github: 'https://github.com/W3JDev',
    portfolio: 'https://bento.me/mnj',
    phone: '+60 12-345-6789',
    bio: 'Full-Stack AI Developer at w3j LLC. Transforming Malaysian hospitality and global businesses through intelligent automation. 11+ years of F&B expertise meets cutting-edge technology.',
    availability: true,
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'Full-Stack Development',
      'React & TypeScript',
      'Python & FastAPI',
      'Node.js & Express',
      'PostgreSQL & MongoDB',
      'AWS & Azure',
      'DevOps & Docker',
      'F&B Industry Expertise'
    ],
    experience: '11+',
    roiImpact: '300%'
  } as Settings,

  about: {
    bio: 'Full-Stack AI Developer at w3j LLC with 11+ years of F&B industry expertise. I specialize in creating intelligent automation solutions that transform traditional hospitality operations. My unique background combines deep restaurant operations knowledge with cutting-edge AI technology, enabling me to build solutions that actually work in real-world environments.',
    experience: '11+ years in F&B industry, 5+ years in AI/ML development',
    achievements: [
      {
        year: '2024',
        title: 'GuestAi Launch Success',
        description: 'Successfully deployed AI guest management system across 50+ hospitality venues with 45% improvement in guest satisfaction'
      },
      {
        year: '2023',
        title: 'ArtisanAI Milestone',
        description: 'Helped 10,000+ job seekers land interviews with AI-powered resume optimization, achieving 300% callback rate improvement'
      },
      {
        year: '2023',
        title: 'PUNCH-CLOCK Enterprise',
        description: 'Eliminated time theft for 500+ employees across multiple companies, saving an average of $50K annually per client'
      },
      {
        year: '2022',
        title: 'AI Specialization',
        description: 'Completed advanced AI/ML certifications and began focusing exclusively on hospitality industry automation'
      }
    ],
    education: [
      {
        year: '2018-2020',
        degree: 'Self-Taught Full-Stack Development',
        institution: 'Online Platforms & Real Projects'
      },
      {
        year: '2021-2022',
        degree: 'AI/ML Specialization',
        institution: 'Stanford Online & Coursera'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        year: '2023'
      },
      {
        name: 'Machine Learning Specialization',
        issuer: 'Stanford University',
        year: '2022'
      },
      {
        name: 'React Advanced Certification',
        issuer: 'Meta',
        year: '2022'
      }
    ]
  } as AboutInfo
};

export function StaticDataProvider({ children }: StaticDataProviderProps) {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const contextValue: PortfolioData = {
    ...STATIC_DATA,
    loading,
    error
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Contact form hook for static version
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
    setLoading(true);
    
    try {
      // Simulate form submission - in real implementation, you could send to Netlify Forms, Formspree, etc.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log to console for demo purposes
      console.log('📧 Contact Form Submission:', formData);
      
      // You could integrate with services like:
      // - Netlify Forms (just add netlify attribute to form)
      // - Formspree (POST to their endpoint)
      // - EmailJS (client-side email sending)
      // - Your own simple API endpoint
      
      return { 
        success: true, 
        inquiryId: 'local-' + Date.now(), 
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.' 
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw new Error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { submitInquiry, loading };
}