import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react';
import { PremiumHeading, PremiumText, PremiumContainer } from './PremiumTypography';
import { PremiumGlassCard } from './PremiumCard';
import { PremiumButton } from './PremiumButton';
import { useContactForm } from './StaticDataProvider';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitInquiry, loading } = useContactForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Ensure required fields are present
      const submissionData = {
        name: data.name || '',
        email: data.email || '',
        subject: data.subject || '',
        message: data.message || '',
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
      };

      const result = await submitInquiry(submissionData);

      if (result.success) {
        setIsSubmitted(true);
        toast.success(result.message);
        reset();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const goBack = () => {
    window.location.hash = '#';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <PremiumContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <PremiumGlassCard className="max-w-md mx-auto p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <PremiumHeading level={2} className="mb-4" gradient="from-green-400 to-emerald-400">
                Message Sent!
              </PremiumHeading>
              
              <PremiumText color="secondary" className="mb-6">
                Thank you for reaching out! I'll get back to you within 24 hours with exciting possibilities for your project.
              </PremiumText>
              
              <PremiumButton onClick={goBack} size="lg" gradient="from-blue-600 to-purple-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </PremiumButton>
            </PremiumGlassCard>
          </motion.div>
        </PremiumContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <PremiumContainer className="relative z-10 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Button
            onClick={goBack}
            variant="ghost"
            className="mb-8 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          
          <PremiumHeading level={1} className="mb-6" gradient="from-blue-400 to-purple-400">
            Let's Build Something <span className="font-black">Amazing</span>
          </PremiumHeading>
          
          <PremiumText size="xl" color="secondary" className="max-w-3xl mx-auto">
            Ready to transform your business with AI-powered solutions? 
            Let's discuss your vision and create something extraordinary together.
          </PremiumText>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PremiumGlassCard className="p-6 h-fit">
              <PremiumHeading level={3} className="mb-6 text-white">
                Get in Touch
              </PremiumHeading>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <PremiumText size="sm" color="muted">Email</PremiumText>
                    <PremiumText className="text-white">mnjewelps@gmail.com</PremiumText>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <PremiumText size="sm" color="muted">Phone</PremiumText>
                    <PremiumText className="text-white">+60 12-345-6789</PremiumText>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <PremiumText size="sm" color="muted">Location</PremiumText>
                    <PremiumText className="text-white">Malaysia</PremiumText>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <PremiumText size="sm" color="muted">Response Time</PremiumText>
                    <PremiumText className="text-white">Within 24 hours</PremiumText>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <PremiumText size="sm" color="muted" className="mb-4">Connect with me</PremiumText>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/mn-jewel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://github.com/W3JDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://bento.me/mnj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <PremiumText size="sm" className="text-green-400">Available for Projects</PremiumText>
                </div>
                <PremiumText size="sm" color="muted">
                  Currently accepting new client projects and collaborations
                </PremiumText>
              </div>
            </PremiumGlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <PremiumGlassCard className="p-8">
              <PremiumHeading level={3} className="mb-6 text-white">
                Start Your Project
              </PremiumHeading>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input
                      {...register('name')}
                      id="name"
                      placeholder="Your full name"
                      className="mt-2 glass-effect text-white placeholder-gray-400"
                    />
                    {errors.name && (
                      <PremiumText size="sm" className="text-red-400 mt-1">
                        {errors.name.message}
                      </PremiumText>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 glass-effect text-white placeholder-gray-400"
                    />
                    {errors.email && (
                      <PremiumText size="sm" className="text-red-400 mt-1">
                        {errors.email.message}
                      </PremiumText>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">Subject *</Label>
                  <Input
                    {...register('subject')}
                    id="subject"
                    placeholder="Brief description of your project"
                    className="mt-2 glass-effect text-white placeholder-gray-400"
                  />
                  {errors.subject && (
                    <PremiumText size="sm" className="text-red-400 mt-1">
                      {errors.subject.message}
                    </PremiumText>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectType" className="text-white">Project Type</Label>
                    <Select onValueChange={(value) => setValue('projectType', value)}>
                      <SelectTrigger className="mt-2 glass-effect text-white">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-ml">AI/ML Development</SelectItem>
                        <SelectItem value="fullstack">Full-Stack Web App</SelectItem>
                        <SelectItem value="automation">F&B Automation</SelectItem>
                        <SelectItem value="consulting">Technical Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timeline" className="text-white">Timeline</Label>
                    <Select onValueChange={(value) => setValue('timeline', value)}>
                      <SelectTrigger className="mt-2 glass-effect text-white">
                        <SelectValue placeholder="Project timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">1-3 months</SelectItem>
                        <SelectItem value="6-months">3-6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-white">Budget Range</Label>
                  <Select onValueChange={(value) => setValue('budget', value)}>
                    <SelectTrigger className="mt-2 glass-effect text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                      <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                      <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                      <SelectItem value="50k+">$50K+</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Message *</Label>
                  <Textarea
                    {...register('message')}
                    id="message"
                    placeholder="Tell me about your project, goals, and challenges you're facing..."
                    rows={6}
                    className="mt-2 glass-effect text-white placeholder-gray-400 resize-none"
                  />
                  {errors.message && (
                    <PremiumText size="sm" className="text-red-400 mt-1">
                      {errors.message.message}
                    </PremiumText>
                  )}
                </div>

                <PremiumButton
                  type="submit"
                  size="lg"
                  gradient="from-blue-600 via-purple-600 to-pink-600"
                  className="w-full text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                      />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Send Message
                    </>
                  )}
                </PremiumButton>
              </form>

              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <PremiumText size="sm" color="secondary">
                  💡 <strong>Pro Tip:</strong> The more details you provide about your project, 
                  the better I can understand your needs and provide an accurate timeline and quote.
                </PremiumText>
              </div>
            </PremiumGlassCard>
          </motion.div>
        </div>
      </PremiumContainer>
    </div>
  );
}