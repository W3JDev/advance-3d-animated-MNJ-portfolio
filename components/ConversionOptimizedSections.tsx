import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, Users, TrendingUp, CheckCircle2, Star, Award, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { animationConfig } from '../constants/portfolioConstants';

// Trust Building Section - Addresses Risk Concerns
export const TrustBuildingSection: React.FC = () => {
  const ref = React.useRef(null);

  const trustIndicators = [
    {
      icon: Shield,
      title: "100% Success Rate",
      description: "Every project delivered on time and within budget",
      color: "green"
    },
    {
      icon: Clock,
      title: "24-Hour Response",
      description: "Quick communication guaranteed",
      color: "blue"
    },
    {
      icon: Users,
      title: "50+ Happy Clients",
      description: "From startups to enterprise solutions",
      color: "purple"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Featured in tech publications",
      color: "yellow"
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-blue-950/30 via-gray-900/50 to-black relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            Why <span className="text-blue-400 drop-shadow-lg">Fortune 500s</span> Trust Me
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg">
            When your business is on the line, you need someone who delivers.
            Here's why industry leaders choose my expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:border-white/50 hover:bg-white/20 transition-all duration-300 group shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg ${
                indicator.color === 'green' ? 'bg-green-500/30' :
                indicator.color === 'blue' ? 'bg-blue-500/30' :
                indicator.color === 'purple' ? 'bg-purple-500/30' :
                'bg-yellow-500/30'
              }`}>
                <indicator.icon className={`w-8 h-8 drop-shadow-lg ${
                  indicator.color === 'green' ? 'text-green-300' :
                  indicator.color === 'blue' ? 'text-blue-300' :
                  indicator.color === 'purple' ? 'text-purple-300' :
                  'text-yellow-300'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">{indicator.title}</h3>
              <p className="text-gray-100 leading-relaxed drop-shadow-md">{indicator.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-2xl p-8 border border-blue-400/50 shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-300 mb-2 drop-shadow-lg">$2.5M+</div>
              <div className="text-gray-100 drop-shadow-md">Revenue Generated for Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-300 mb-2 drop-shadow-lg">99.8%</div>
              <div className="text-gray-100 drop-shadow-md">Uptime Across All Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-300 mb-2 drop-shadow-lg">48hrs</div>
              <div className="text-gray-100 drop-shadow-md">Average Project Start Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Transparency Section - Reduces Uncertainty
export const ProcessTransparencySection: React.FC = () => {
  const ref = React.useRef(null);

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "Deep dive into your business needs and technical requirements",
      duration: "1-2 days",
      deliverable: "Technical roadmap & project timeline"
    },
    {
      step: "02", 
      title: "Design & Architecture",
      description: "Create scalable solutions with future growth in mind",
      duration: "3-5 days",
      deliverable: "System architecture & UI/UX mockups"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with continuous testing and feedback",
      duration: "2-8 weeks",
      deliverable: "Working MVP with full documentation"
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description: "Smooth deployment with performance monitoring",
      duration: "1-2 weeks",
      deliverable: "Live system + 30-day support"
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-gray-950/50 via-black to-gray-950/30 relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            My <span className="text-green-400 drop-shadow-lg">Proven Process</span>
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg">
            No surprises, no hidden costs. Here's exactly how I transform your vision into reality.
          </p>
        </motion.div>

        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Content */}
              <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:border-white/50 hover:bg-white/20 transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl drop-shadow-lg">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{step.title}</h3>
                    <p className="text-blue-300 font-medium drop-shadow-md">{step.duration}</p>
                  </div>
                </div>
                <p className="text-gray-100 text-lg leading-relaxed mb-4 drop-shadow-md">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle2 className="w-5 h-5 drop-shadow-lg" />
                  <span className="font-medium drop-shadow-md">Deliverable: {step.deliverable}</span>
                </div>
              </div>

              {/* Visual Element */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border border-white/20 shadow-xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-2 border-dashed border-blue-300/60 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-2xl p-8 border border-green-400/30 text-center shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Shield className="w-16 h-16 text-green-300 mx-auto mb-6 drop-shadow-lg" />
          <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">100% Satisfaction Guarantee</h3>
          <p className="text-xl text-gray-100 mb-6 drop-shadow-md">
            If you're not completely satisfied with the first milestone, I'll refund your investment—no questions asked.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 shadow-lg">
            Start Risk-Free Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Urgency & Scarcity Section - Drives Action
export const UrgencySection: React.FC = () => {
  const ref = React.useRef(null);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-950/30 via-orange-950/20 to-red-950/30 relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl p-12 border border-orange-400/40 shadow-2xl backdrop-blur-md">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-orange-500/40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Zap className="w-10 h-10 text-orange-300 drop-shadow-lg" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Limited Availability Alert
            </h2>

            <p className="text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
              I only take on <strong className="text-orange-300 drop-shadow-md">2 new projects per quarter</strong> to ensure
              each client gets my full attention and expertise. Current availability is filling fast.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/30 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-3xl font-bold text-orange-300 mb-2 drop-shadow-lg">Q1 2024</div>
                <div className="text-red-300 font-medium drop-shadow-md">FULLY BOOKED</div>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-3xl font-bold text-orange-300 mb-2 drop-shadow-lg">Q2 2024</div>
                <div className="text-yellow-300 font-medium drop-shadow-md">1 SPOT LEFT</div>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-3xl font-bold text-orange-300 mb-2 drop-shadow-lg">Q3 2024</div>
                <div className="text-green-300 font-medium drop-shadow-md">AVAILABLE</div>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                Reserve Your Spot Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-300 text-orange-300 hover:bg-orange-400/10 px-8 py-4 text-lg shadow-lg"
              >
                Join Waitlist
              </Button>
            </motion.div>

            <p className="text-sm text-gray-300 mt-6 drop-shadow-md">
              * Spots are reserved on a first-come, first-served basis with a 50% deposit
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
