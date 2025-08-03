import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { AdvancedProjectCard } from '../AdvancedProjectCard';
import { PremiumHeading, PremiumText, PremiumContainer } from '../PremiumTypography';
import { PremiumButton } from '../PremiumButton';
import { SafeMagneticButton } from '../SafeMagneticButton';
import { animationConfig } from '../../constants/portfolioConstants';
import { OptimizedMotion } from '../PerformanceOptimizer';
import { StaggeredLoader, LazyWrapper } from '../ProgressiveLoader';

interface ProjectsSectionProps {
  projects: any[];
  settings: any;
  onViewCaseStudy: (project: any) => void;
}

export function ProjectsSection({ projects, settings, onViewCaseStudy }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-purple-950/20 via-black to-blue-950/20">
      <PremiumContainer>
        <OptimizedMotion
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={animationConfig.pageTransition}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <PremiumHeading level={1} className="mb-8" gradient="from-pink-400 to-purple-400">
            Featured <span className="font-black">Projects</span>
          </PremiumHeading>
          <PremiumText size="xl" color="secondary" className="max-w-4xl mx-auto">
            Real-world solutions delivering measurable business impact
          </PremiumText>
        </OptimizedMotion>

        {/* Projects Grid - 2 columns, 3 rows for 6 projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.slice(0, 6).map((project, index) => (
            <LazyWrapper
              key={project.id}
              className="w-full"
            >
              <AdvancedProjectCard
                project={project}
                index={index}
                onViewCaseStudy={onViewCaseStudy}
              />
            </LazyWrapper>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: animationConfig.viewportMargin }}
        >
          <SafeMagneticButton>
            <a href={settings.github} target="_blank" rel="noopener noreferrer" className="inline-block">
              <PremiumButton size="lg" gradient="from-pink-600 to-purple-600">
                View All Projects on GitHub
                <ExternalLink className="ml-2 h-5 w-5" />
              </PremiumButton>
            </a>
          </SafeMagneticButton>
        </motion.div>
      </PremiumContainer>
    </section>
  );
}