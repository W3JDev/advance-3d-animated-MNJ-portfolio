import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumGlassCard } from '../PremiumCard';
import { PremiumButton } from '../PremiumButton';
import { SafeMagneticButton } from '../SafeMagneticButton';
import { methodology, animationConfig } from '../../constants/portfolioConstants';

export function MethodologySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950/50 to-black relative overflow-hidden">
      <PremiumContainer>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumHeading level={1} className="mb-8" gradient="from-green-400 to-blue-400">
            My <span className="font-black">Methodology</span>
          </PremiumHeading>
          <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
            A proven process that transforms complex challenges into elegant solutions
          </PremiumText>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodology.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * animationConfig.staggerDelay,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-30px" }}
              className="relative group"
            >
              <PremiumGlassCard className="h-full text-center group-hover:scale-105 transition-transform duration-300 p-6 min-h-[400px] flex flex-col">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${step.iconGradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {step.icon}
                </motion.div>
                
                <div className="text-3xl font-black text-white mb-4">
                  {step.step}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 leading-tight min-h-[3.5rem] flex items-center justify-center">
                  <span className="text-center">{step.title}</span>
                </h3>
                
                <p className="text-sm text-gray-300 mb-4 leading-relaxed flex-1">
                  {step.description}
                </p>

                <motion.div
                  className="overflow-hidden border-t border-white/10 pt-4 mt-auto"
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.details}
                  </p>
                </motion.div>

                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
              </PremiumGlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <SafeMagneticButton>
            <PremiumButton size="xl" gradient="from-green-600 to-blue-600">
              See My Process in Action
              <ArrowRight className="ml-3 h-6 w-6" />
            </PremiumButton>
          </SafeMagneticButton>
        </motion.div>
      </PremiumContainer>
    </section>
  );
}