import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ChevronRight } from 'lucide-react';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumButton } from '../PremiumButton';
import { SafeMagneticButton } from '../SafeMagneticButton';
import { animationConfig } from '../../constants/portfolioConstants';

interface ContactSectionProps {
  settings: any;
  onContactClick: () => void;
}

export function ContactSection({ settings, onContactClick }: ContactSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-950 via-black to-purple-950/20 relative overflow-hidden">
      <PremiumContainer className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumHeading level={1} className="mb-12" gradient="from-yellow-400 to-orange-400">
            Ready to <span className="font-black">Innovate?</span>
          </PremiumHeading>
          
          <PremiumText size="xl" color="secondary" className="mb-16 max-w-4xl mx-auto">
            Let's transform your vision into intelligent, scalable solutions that 
            drive real business results. Based in {settings.location}, serving clients globally.
          </PremiumText>
          
          {/* Contact methods */}
          <motion.div 
            className="flex justify-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, margin: animationConfig.viewportMargin }}
          >
            <SafeMagneticButton>
              <a href={`mailto:${settings.email}`} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-2xl"
                >
                  <Mail className="h-8 w-8 text-white" />
                </motion.div>
              </a>
            </SafeMagneticButton>

            <SafeMagneticButton>
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl"
                >
                  <Linkedin className="h-8 w-8 text-white" />
                </motion.div>
              </a>
            </SafeMagneticButton>

            <SafeMagneticButton>
              <a href={settings.github} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 p-6 rounded-2xl shadow-2xl"
                >
                  <Github className="h-8 w-8 text-white" />
                </motion.div>
              </a>
            </SafeMagneticButton>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: animationConfig.viewportMargin }}
          >
            <SafeMagneticButton>
              <PremiumButton 
                size="xl" 
                gradient="from-green-600 via-blue-600 to-purple-600"
                className="text-2xl px-16 py-6"
                onClick={onContactClick}
              >
                Start Your Project
                <ChevronRight className="ml-4 h-8 w-8" />
              </PremiumButton>
            </SafeMagneticButton>
          </motion.div>
        </motion.div>
      </PremiumContainer>
    </section>
  );
}