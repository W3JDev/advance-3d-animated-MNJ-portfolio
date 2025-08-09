import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { PremiumText } from './PremiumTypography';
import { supabaseUtils, checkSupabaseConfig } from '../utils/supabase/client';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

export function NewsletterSignup({ 
  className = '', 
  placeholder = 'Enter your email for updates...',
  buttonText = 'Subscribe'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      if (checkSupabaseConfig()) {
        const result = await supabaseUtils.subscribeNewsletter(email, name || undefined);
        
        if (result.success) {
          setIsSubscribed(true);
          toast.success('Successfully subscribed to newsletter!');
          setEmail('');
          setName('');
        } else {
          throw new Error(result.error?.message || 'Failed to subscribe');
        }
      } else {
        // Fallback - just show success message
        console.log('Newsletter signup (fallback):', { email, name });
        setIsSubscribed(true);
        toast.success('Thanks for subscribing! (Note: Supabase not configured)');
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center justify-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl ${className}`}
      >
        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
        <PremiumText className="text-green-300">
          Thanks for subscribing!
        </PremiumText>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 transition-colors"
          disabled={isSubmitting}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting || !email}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Mail className="w-5 h-5" />
            </motion.div>
          ) : (
            <>
              {buttonText === 'Subscribe' ? <ArrowRight className="w-5 h-5" /> : buttonText}
            </>
          )}
        </Button>
      </div>
      
      {/* Optional name field for enhanced signup */}
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 transition-colors text-sm"
        disabled={isSubmitting}
      />
      
      <PremiumText size="xs" color="muted" className="text-center">
        Get updates on new projects and insights. No spam, unsubscribe anytime.
      </PremiumText>
    </form>
  );
}

export default NewsletterSignup;
