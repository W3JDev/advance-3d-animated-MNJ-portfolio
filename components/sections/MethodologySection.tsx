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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * animationConfig.staggerDelay,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-30px" }}
              className="relative group"
            >
              {/* Premium 3D Card Container */}
              <motion.div
                className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col"
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Premium gradient border animation */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${step.iconGradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />

                {/* 3D depth layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-50" />
                <div className="absolute inset-2 bg-gradient-to-br from-white/3 to-transparent rounded-2xl opacity-30" />

                <div className="p-8 text-center relative z-10 flex flex-col h-full">
                  {/* Enhanced 3D Icon */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-r ${step.iconGradient} rounded-3xl flex items-center justify-center text-white shadow-2xl relative`}
                    animate={{
                      y: [0, -6, 0],
                      rotateY: [0, 5, 0],
                      boxShadow: [
                        "0 10px 30px rgba(0,0,0,0.3)",
                        "0 15px 40px rgba(0,0,0,0.4)",
                        "0 10px 30px rgba(0,0,0,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                  >
                    {/* 3D highlight */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-2xl" />
                    <div className="relative z-10 scale-110">
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Premium step number */}
                  <motion.div
                    className="text-4xl font-black text-white mb-6 relative"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.3)",
                        "0 0 30px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {step.step}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
                  </motion.div>

                  {/* Enhanced title */}
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight min-h-[3.5rem] flex items-center justify-center">
                    <span className="text-center bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {step.title}
                    </span>
                  </h3>

                  {/* Premium description */}
                  <p className="text-gray-200 mb-6 leading-relaxed flex-1 font-medium">
                    {step.description}
                  </p>

                  {/* Enhanced expandable details */}
                  <motion.div
                    className="overflow-hidden border-t border-white/20 pt-6 mt-auto"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                      {step.details}
                    </p>
                  </motion.div>

                  {/* Premium background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />

                  {/* Premium shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-32 -translate-x-full"
                    animate={{
                      translateX: ['0%', '200%']
                    }}
                    transition={{
                      duration: 2.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 5 + index
                    }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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