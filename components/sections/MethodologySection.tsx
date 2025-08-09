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
    <section className="py-16 bg-gradient-to-b from-black via-gray-950/50 to-black relative overflow-hidden">
      <PremiumContainer>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: "-20px" }}
        >
          <PremiumHeading level={1} className="mb-8" gradient="from-green-400 to-blue-400">
            My <span className="font-black">Methodology</span>
          </PremiumHeading>
          <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
            A proven process that transforms complex challenges into elegant solutions
          </PremiumText>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodology.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, margin: "-20px" }}
              className="relative group"
            >
              {/* Clean Premium Card Container */}
              <motion.div
                className="h-full relative overflow-hidden rounded-2xl min-h-[420px] flex flex-col group bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {/* Clean Glass Background */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xl rounded-2xl" />
                
                {/* Subtle Border Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.iconGradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

                <div className="p-8 text-center relative z-10 flex flex-col h-full justify-between">
                  {/* Clean 3D Icon */}
                  <div className="mb-6">
                    <motion.div
                      className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.iconGradient} rounded-2xl flex items-center justify-center text-white shadow-xl`}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="relative z-20 scale-110">
                        {step.icon}
                      </div>
                    </motion.div>
                  </div>

                  {/* Clean Step Number */}
                  <div className="mb-4">
                    <div className="text-4xl font-black text-white/90">
                      {step.step}
                    </div>
                  </div>

                  {/* Clean Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold leading-tight text-white">
                      {step.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-3" />
                  </div>

                  {/* Clean Description */}
                  <div className="mb-6 flex-1 flex items-center">
                    <p className="text-gray-200 leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Clean Duration Badge */}
                  <div className="mb-4">
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${step.iconGradient} rounded-full text-white text-sm font-medium`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-2" />
                      {step.duration || '1-2 days'}
                    </div>
                  </div>

                  {/* Clean Details Section */}
                  <motion.div
                    className="border-t border-white/20 pt-4"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {step.details}
                      </p>
                      <div className="mt-2 flex items-center text-xs text-green-300">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
                        <span>Deliverable: {step.deliverable || 'Technical roadmap & project timeline'}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-20px" }}
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