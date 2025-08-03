import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumButton } from '../PremiumButton';
import { animationConfig } from '../../constants/portfolioConstants';

interface FooterSectionProps {
  settings: any;
}

export function FooterSection({ settings }: FooterSectionProps) {
  return (
    <footer className="py-16 bg-black border-t border-white/10 relative overflow-hidden">
      <PremiumContainer>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={animationConfig.pageTransition}
              viewport={{ once: true, margin: animationConfig.viewportMargin }}
            >
              <PremiumHeading level={2} className="mb-6" gradient="from-purple-400 to-pink-400">
                MN JEWEL
              </PremiumHeading>
              <PremiumText color="muted" className="mb-8 leading-relaxed">
                {settings.bio}
              </PremiumText>
              
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email for updates..."
                  className="flex-1 px-5 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors font-light"
                />
                <PremiumButton size="md" gradient="from-purple-600 to-pink-600">
                  <ArrowRight className="w-5 h-5" />
                </PremiumButton>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={animationConfig.pageTransition}
              viewport={{ once: true, margin: animationConfig.viewportMargin }}
            >
              <PremiumHeading level={4} className="mb-6 text-white">Services</PremiumHeading>
              <ul className="space-y-3">
                {['AI/ML Development', 'F&B Automation', 'Full-Stack Development', 'Process Optimization'].map((service) => (
                  <li key={service}>
                    <PremiumText size="sm" color="muted" className="hover:text-white transition-colors cursor-pointer">
                      {service}
                    </PremiumText>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: animationConfig.viewportMargin }}
            >
              <PremiumHeading level={4} className="mb-6 text-white">Connect</PremiumHeading>
              <ul className="space-y-3">
                <li>
                  <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                    <PremiumText size="sm" color="muted" className="hover:text-white transition-colors cursor-pointer">
                      LinkedIn
                    </PremiumText>
                  </a>
                </li>
                <li>
                  <a href={settings.github} target="_blank" rel="noopener noreferrer">
                    <PremiumText size="sm" color="muted" className="hover:text-white transition-colors cursor-pointer">
                      GitHub
                    </PremiumText>
                  </a>
                </li>
                <li>
                  <a href={settings.portfolio} target="_blank" rel="noopener noreferrer">
                    <PremiumText size="sm" color="muted" className="hover:text-white transition-colors cursor-pointer">
                      Portfolio
                    </PremiumText>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.email}`}>
                    <PremiumText size="sm" color="muted" className="hover:text-white transition-colors cursor-pointer">
                      Email
                    </PremiumText>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumText color="muted" className="mb-4 md:mb-0">
            © 2025 MN Jewel • {settings.company} • {settings.location} • Turning complex problems into elegant solutions since 2013
          </PremiumText>
          
          <Badge variant="secondary" className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 px-4 py-2">
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {settings.availability ? 'Available for Projects' : 'Currently Unavailable'}
          </Badge>
        </motion.div>
      </PremiumContainer>
    </footer>
  );
}