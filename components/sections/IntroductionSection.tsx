import React from 'react';
import { motion } from 'framer-motion';
import { BentoGrid } from '../BentoGrid';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumButton } from '../PremiumButton';
import { SafeMagneticButton } from '../SafeMagneticButton';
import { createBentoItems, animationConfig } from '../../constants/portfolioConstants';

interface IntroductionSectionProps {
  settings: any;
}

export function IntroductionSection({ settings }: IntroductionSectionProps) {
  const bentoItems = createBentoItems(settings);

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-950/50 to-black transition-colors duration-1000">
      <PremiumContainer>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumHeading level={1} className="mb-8" gradient="from-blue-400 to-purple-400">
            A Unique <span className="font-black block">Perspective</span>
          </PremiumHeading>
          <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
            Where {settings.location} hospitality wisdom meets cutting-edge AI innovation
          </PremiumText>
        </motion.div>
        
        <BentoGrid items={bentoItems} />

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <SafeMagneticButton>
            <PremiumButton size="lg" gradient="from-blue-600 to-purple-600">
              Discover My Skills
            </PremiumButton>
          </SafeMagneticButton>
        </motion.div>
      </PremiumContainer>
    </section>
  );
}