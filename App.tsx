import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
import { MotionProvider, useMotion } from './components/MotionProvider';
import { PremiumHeading, PremiumText, PremiumContainer } from './components/PremiumTypography';
import { PremiumButton } from './components/PremiumButton';
import { StaticDataProvider, usePortfolioData } from './components/StaticDataProvider';
import { PerformanceProvider } from './components/PerformanceOptimizer';
import { SmartPreloader } from './components/ProgressiveLoader';
import { AccessibilityProvider, SkipToContent } from './components/AccessibilityEnhancements';
import { animationConfig, colorThemes } from './constants/portfolioConstants';

// Lazy-loaded heavy / below-the-fold components (using named export mapping)
const LuxuryBackground = React.lazy(() => import('./components/LuxuryBackground').then(m => ({ default: m.LuxuryBackground })));
const RunningText = React.lazy(() => import('./components/RunningText').then(m => ({ default: m.RunningText })));
const InteractiveFAQ = React.lazy(() => import('./components/InteractiveFAQ').then(m => ({ default: m.InteractiveFAQ })));
const SkillsShowcase = React.lazy(() => import('./components/SkillsShowcase').then(m => ({ default: m.SkillsShowcase })));
const DetailedAbout = React.lazy(() => import('./components/DetailedAbout').then(m => ({ default: m.DetailedAbout })));
const CaseStudy = React.lazy(() => import('./components/CaseStudy').then(m => ({ default: m.CaseStudy })));
const ContactForm = React.lazy(() => import('./components/ContactForm').then(m => ({ default: m.ContactForm })));
const Navigation = React.lazy(() => import('./components/Navigation').then(m => ({ default: m.Navigation })));
const SafeMagneticButton = React.lazy(() => import('./components/SafeMagneticButton').then(m => ({ default: m.SafeMagneticButton })));
const MarketingOptimizedHero = React.lazy(() => import('./components/MarketingOptimizedHero').then(m => ({ default: m.MarketingOptimizedHero })));
const TrustBuildingSection = React.lazy(() => import('./components/ConversionOptimizedSections').then(m => ({ default: m.TrustBuildingSection })));
const ProcessTransparencySection = React.lazy(() => import('./components/ConversionOptimizedSections').then(m => ({ default: m.ProcessTransparencySection })));
const UrgencySection = React.lazy(() => import('./components/ConversionOptimizedSections').then(m => ({ default: m.UrgencySection })));
const IntroductionSection = React.lazy(() => import('./components/sections/IntroductionSection').then(m => ({ default: m.IntroductionSection })));
const MethodologySection = React.lazy(() => import('./components/sections/MethodologySection').then(m => ({ default: m.MethodologySection })));
const ProjectsSection = React.lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const TestimonialsSection = React.lazy(() => import('./components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
const FooterSection = React.lazy(() => import('./components/sections/FooterSection').then(m => ({ default: m.FooterSection })));

// Fallback components
const FallbackBlock = ({ label, className = '' }: { label: string; className?: string }) => (
  <div data-testid={`fallback-${label.toLowerCase().replace(/\s+/g,'-')}`} className={`animate-pulse text-xs tracking-wider uppercase text-white/40 ${className}`}>{label} Loading...</div>
);

// Utility functions
function getRouteFromHash() {
  return window.location.hash.slice(1) || 'portfolio';
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash());
  const heroRef = useRef<HTMLElement>(null);
  const { projects, testimonials, faqs, settings } = usePortfolioData();
  
  // Get motion context but don't destructure hooks yet
  const motionContext = useMotion();
  const { motion } = motionContext;
  
  const handleContactClick = useCallback(() => { 
    window.location.hash = '#contact'; 
  }, []);

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
        <Suspense fallback={<FallbackBlock label="Contact Form" />}>
          <ContactForm />
        </Suspense>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen text-white overflow-x-hidden relative bg-black"
    >
      <Suspense fallback={<FallbackBlock label="Background" className="absolute inset-0 flex items-center justify-center" />}>
        <LuxuryBackground />
      </Suspense>

      <Suspense fallback={<FallbackBlock label="Nav" />}>
        <Navigation onContactClick={handleContactClick} />
      </Suspense>

      <Suspense fallback={null}>
        {selectedProject && (
          <CaseStudy 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </Suspense>

      <motion.section
        ref={heroRef}
        className="relative"
      >
        <Suspense fallback={<FallbackBlock label="Hero" />}>
          <MarketingOptimizedHero />
        </Suspense>
      </motion.section>

      <motion.div 
        className="border-y border-white/20 relative overflow-hidden bg-gradient-to-r from-purple-950/30 via-blue-950/30 to-purple-950/30"
      >
        <Suspense fallback={<FallbackBlock label="Running Text" />}>
          <RunningText 
            text={`✦ ARTIFICIAL INTELLIGENCE ✦ BLOCKCHAIN REVOLUTION ✦ FULL-STACK MASTERY ✦ CREATIVE TECHNOLOGY ✦ ENTERPRISE SOLUTIONS ✦ NEURAL NETWORKS ✦ ${settings.roiImpact} ROI IMPACT ✦ ${settings.location} BASED ✦ ${settings.company}`}
            speed={100}
          />
        </Suspense>
      </motion.div>

      <Suspense fallback={<FallbackBlock label="Conversion Sections" />}>
        <TrustBuildingSection />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Process" />}>
        <ProcessTransparencySection />
      </Suspense>

      <Suspense fallback={<FallbackBlock label="Introduction" />}>
        <IntroductionSection settings={settings} />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Skills" />}>
        <SkillsShowcase />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Methodology" />}>
        <MethodologySection />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Projects" />}>
        <ProjectsSection 
          projects={projects} 
          settings={settings} 
          onViewCaseStudy={setSelectedProject} 
        />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Testimonials" />}>
        <TestimonialsSection 
          testimonials={testimonials} 
          settings={settings} 
          onContactClick={handleContactClick} 
        />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="About" />}>
        <DetailedAbout />
      </Suspense>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-black via-cyan-950/20 to-black">
        <PremiumContainer size="md">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={animationConfig.pageTransition}
            viewport={{ once: true, margin: "-20px" }}
          >
            <PremiumHeading level={1} className="mb-8" gradient="from-cyan-400 to-blue-400">
              Frequently Asked <span className="font-black">Questions</span>
            </PremiumHeading>
            <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
              Everything you need to know about working with me
            </PremiumText>
          </motion.div>
          
          <Suspense fallback={<FallbackBlock label="FAQ" />}>
            <InteractiveFAQ faqs={faqs} />
          </Suspense>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-20px" }}
          >
            <Suspense fallback={<FallbackBlock label="Questions Button" />}>
              <SafeMagneticButton>
                <PremiumButton 
                  size="lg" 
                  gradient="from-cyan-600 to-blue-600"
                  onClick={handleContactClick}
                >
                  Still Have Questions?
                </PremiumButton>
              </SafeMagneticButton>
            </Suspense>
          </motion.div>
        </PremiumContainer>
      </section>

      <Suspense fallback={<FallbackBlock label="Urgency" />}> <UrgencySection /> </Suspense>

      <Suspense fallback={<FallbackBlock label="Contact Section" />}>
        <ContactSection settings={settings} onContactClick={handleContactClick} />
      </Suspense>
      <Suspense fallback={<FallbackBlock label="Footer" />}>
        <FooterSection settings={settings} />
      </Suspense>
    </motion.div>
  );
}

export default function App() {
  // Remove font preload for now since files don't exist
  const criticalResources: string[] = [];
  return (
    <AccessibilityProvider>
      <PerformanceProvider>
        <MotionProvider>
          <SmartPreloader resources={criticalResources} onComplete={() => console.log('Critical resources loaded')}>
            <SkipToContent />
            <StaticDataProvider>
              <Suspense fallback={<div className="text-white p-4" data-testid="app-loading">Initializing...</div>}>
                <AppContent />
              </Suspense>
            </StaticDataProvider>
          </SmartPreloader>
        </MotionProvider>
      </PerformanceProvider>
    </AccessibilityProvider>
  );
}