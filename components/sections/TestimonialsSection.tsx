import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialGrid } from '../TestimonialGrid';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumButton } from '../PremiumButton';
import { SafeMagneticButton } from '../SafeMagneticButton';
import { animationConfig } from '../../constants/portfolioConstants';

interface TestimonialsSectionProps {
  testimonials: any[];
  settings: any;
  onContactClick: () => void;
}

export function TestimonialsSection({ testimonials, settings, onContactClick }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <PremiumContainer>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumHeading level={1} className="mb-8" gradient="from-yellow-400 to-orange-400">
            Client <span className="font-black">Success Stories</span>
          </PremiumHeading>
          <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
            Real results from real partnerships across {settings.location} and beyond
          </PremiumText>
        </motion.div>
        
        <TestimonialGrid testimonials={testimonials} />

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <SafeMagneticButton>
            <PremiumButton 
              size="lg" 
              gradient="from-yellow-600 to-orange-600"
              onClick={onContactClick}
            >
              Join My Success Stories
            </PremiumButton>
          </SafeMagneticButton>
        </motion.div>
      </PremiumContainer>
    </section>
  );
}