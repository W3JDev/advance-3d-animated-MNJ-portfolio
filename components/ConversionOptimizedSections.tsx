import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock, Users, TrendingUp, CheckCircle2, Star, Award, Zap } from 'lucide-react';
import { Button } from './ui/button';

// Trust Building Section - Addresses Risk Concerns
export const TrustBuildingSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow-lg">
            Why <span className="text-blue-400">Fortune 500s</span> Trust Me
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            When your business is on the line, you need someone who delivers.
            Here's why industry leaders choose my expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 bg-${indicator.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <indicator.icon className={`w-8 h-8 text-${indicator.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{indicator.title}</h3>
              <p className="text-gray-200 leading-relaxed">{indicator.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/40"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</div>
              <div className="text-gray-200">Revenue Generated for Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99.8%</div>
              <div className="text-gray-200">Uptime Across All Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">48hrs</div>
              <div className="text-gray-200">Average Project Start Time</div>
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
  const isInView = useInView(ref, { once: true });

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
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-green-400">Proven Process</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            No surprises, no hidden costs. Here's exactly how I transform your vision into reality.
          </p>
        </motion.div>

        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Content */}
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-blue-400 font-medium">{step.duration}</p>
                  </div>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Deliverable: {step.deliverable}</span>
                </div>
              </div>

              {/* Visual Element */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-2 border-dashed border-blue-400/50 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/20 text-center"
        >
          <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">100% Satisfaction Guarantee</h3>
          <p className="text-xl text-gray-300 mb-6">
            If you're not completely satisfied with the first milestone, I'll refund your investment—no questions asked.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
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
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-900/20 to-orange-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-12 border border-orange-500/30">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Zap className="w-10 h-10 text-orange-400" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Limited Availability Alert
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I only take on <strong className="text-orange-400">2 new projects per quarter</strong> to ensure 
              each client gets my full attention and expertise. Current availability is filling fast.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/30 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">Q1 2024</div>
                <div className="text-red-400 font-medium">FULLY BOOKED</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">Q2 2024</div>
                <div className="text-yellow-400 font-medium">1 SPOT LEFT</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">Q3 2024</div>
                <div className="text-green-400 font-medium">AVAILABLE</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold"
              >
                Reserve Your Spot Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-orange-400 text-orange-400 hover:bg-orange-400/10 px-8 py-4 text-lg"
              >
                Join Waitlist
              </Button>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              * Spots are reserved on a first-come, first-served basis with a 50% deposit
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
