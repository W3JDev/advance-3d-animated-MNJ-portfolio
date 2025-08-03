import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RunningText } from './components/RunningText';
import { InteractiveFAQ } from './components/InteractiveFAQ';
import { LuxuryBackground } from './components/LuxuryBackground';
import { SkillsShowcase } from './components/SkillsShowcase';
import { DetailedAbout } from './components/DetailedAbout';
import { CaseStudy } from './components/CaseStudy';
import { PremiumHeading, PremiumText, PremiumContainer } from './components/PremiumTypography';
import { PremiumButton } from './components/PremiumButton';
import { ContactForm } from './components/ContactForm';
import { StaticDataProvider, usePortfolioData } from './components/StaticDataProvider';
import { Navigation } from './components/Navigation';
import { SafeMagneticButton } from './components/SafeMagneticButton';

// Optimized hero components
import { OptimizedStarfield } from './components/OptimizedStarfield';
import { OptimizedHeroSection } from './components/OptimizedHeroSection';

// Marketing-optimized components
import { MarketingOptimizedHero } from './components/MarketingOptimizedHero';
import { TrustBuildingSection, ProcessTransparencySection, UrgencySection } from './components/ConversionOptimizedSections';

// Performance and accessibility components
import { PerformanceProvider, OptimizedMotion } from './components/PerformanceOptimizer';
import { SmartPreloader, LazyWrapper } from './components/ProgressiveLoader';
import { AccessibilityProvider, SkipToContent } from './components/AccessibilityEnhancements';

// Section components
import { IntroductionSection } from './components/sections/IntroductionSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

// Constants
import { animationConfig, colorThemes } from './constants/portfolioConstants';

// Utility functions
function getRouteFromHash() {
  return window.location.hash.slice(1) || 'portfolio';
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash());
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  
  // Get data from static context
  const { projects, testimonials, faqs, settings, about } = usePortfolioData();
  
  const smoothScrollProgress = useSpring(scrollYProgress, animationConfig.scrollConfig);

  // Optimized parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  // Color theme transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    colorThemes
  );

  // Event handlers
  const handleContactClick = () => {
    window.location.hash = '#contact';
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Route handling
  if (currentRoute === 'contact') {
    return (
      <div className="min-h-screen bg-black text-white">
        <ContactForm />
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen text-white overflow-x-hidden relative bg-black"
      style={{ backgroundColor }}
    >
      {/* Background Effects */}
      <LuxuryBackground />

      {/* Navigation */}
      <Navigation onContactClick={handleContactClick} />

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudy 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Marketing-Optimized Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative"
        style={{ y: y1 }}
      >
        <MarketingOptimizedHero />
      </motion.section>

      {/* Running Text */}
      <motion.div 
        className="border-y border-white/20 relative overflow-hidden bg-gradient-to-r from-purple-950/30 via-blue-950/30 to-purple-950/30"
        style={{ y: y2 }}
      >
        <RunningText 
          text={`✦ ARTIFICIAL INTELLIGENCE ✦ BLOCKCHAIN REVOLUTION ✦ FULL-STACK MASTERY ✦ CREATIVE TECHNOLOGY ✦ ENTERPRISE SOLUTIONS ✦ NEURAL NETWORKS ✦ ${settings.roiImpact} ROI IMPACT ✦ ${settings.location} BASED ✦ ${settings.company}`}
          speed={100}
        />
      </motion.div>

      {/* Conversion-Optimized Sections */}
      <TrustBuildingSection />
      <ProcessTransparencySection />

      {/* Main Sections */}
      <IntroductionSection settings={settings} />
      <SkillsShowcase />
      <MethodologySection />
      <ProjectsSection 
        projects={projects} 
        settings={settings} 
        onViewCaseStudy={setSelectedProject} 
      />
      <TestimonialsSection 
        testimonials={testimonials} 
        settings={settings} 
        onContactClick={handleContactClick} 
      />
      <DetailedAbout />

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-black via-cyan-950/20 to-black">
        <PremiumContainer size="md">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={animationConfig.pageTransition}
            viewport={{ once: true, margin: animationConfig.viewportMargin }}
          >
            <PremiumHeading level={1} className="mb-8" gradient="from-cyan-400 to-blue-400">
              Frequently Asked <span className="font-black">Questions</span>
            </PremiumHeading>
            <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
              Everything you need to know about working with me
            </PremiumText>
          </motion.div>
          
          <InteractiveFAQ faqs={faqs} />

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
                gradient="from-cyan-600 to-blue-600"
                onClick={handleContactClick}
              >
                Still Have Questions?
              </PremiumButton>
            </SafeMagneticButton>
          </motion.div>
        </PremiumContainer>
      </section>

      {/* Urgency & Scarcity Section */}
      <UrgencySection />

      <ContactSection settings={settings} onContactClick={handleContactClick} />
      <FooterSection settings={settings} />
    </motion.div>
  );
}

export default function App() {
  // Critical resources to preload
  const criticalResources = [
    // Add any critical fonts, images, or assets here
    '/fonts/inter-var.woff2',
    // Add other critical resources as needed
  ];

  return (
    <AccessibilityProvider>
      <PerformanceProvider>
        <SmartPreloader
          resources={criticalResources}
          onComplete={() => console.log('Critical resources loaded')}
        >
          <SkipToContent />
          <StaticDataProvider>
            <AppContent />
          </StaticDataProvider>
        </SmartPreloader>
      </PerformanceProvider>
    </AccessibilityProvider>
  );
}