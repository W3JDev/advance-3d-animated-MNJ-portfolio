import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useContactForm } from './StaticDataProvider';

interface FormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export const EnhancedContactForm: React.FC = () => {
  const { submitInquiry, loading } = useContactForm();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'E-commerce',
    'AI/ML Integration',
    'Full-Stack Solution',
    'Consultation'
  ];

  const budgetRanges = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K+'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        subject: `${formData.projectType} Project Inquiry`,
        message: formData.message,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
      };

      const result = await submitInquiry(submissionData);

      if (result.success) {
        setStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            projectType: '',
            budget: '',
            timeline: '',
            message: ''
          });
          setCurrentStep(1);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-green-500/10 rounded-2xl border border-green-500/20"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-300">I'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step <= currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Let's Get Started</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="Your company name (optional)"
            />
          </div>

          <Button
            type="button"
            onClick={nextStep}
            disabled={!formData.name || !formData.email}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Next Step
          </Button>
        </motion.div>
      )}

      {/* Step 2: Project Details */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Project Details</h3>
          
          <div>
            <label className="block text-white font-medium mb-2">Project Type</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({...formData, projectType: e.target.value})}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors"
            >
              <option value="">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-gray-800">{type}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors"
              >
                <option value="">Select budget</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-gray-800">{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Timeline</label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="e.g., 2-3 months"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
              Previous
            </Button>
            <Button type="button" onClick={nextStep} className="flex-1 bg-blue-500 hover:bg-blue-600">
              Next Step
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Message */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Tell Me About Your Project</h3>
          
          <div>
            <label className="block text-white font-medium mb-2">Project Description *</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors resize-none"
              placeholder="Describe your project, goals, and any specific requirements..."
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
              Previous
            </Button>
            <Button
              type="submit"
              disabled={loading || status === 'loading' || !formData.message}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              {(loading || status === 'loading') ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20"
        >
          <AlertCircle className="w-5 h-5" />
          <span>Failed to send message. Please try again.</span>
        </motion.div>
      )}
    </motion.form>
  );
};
