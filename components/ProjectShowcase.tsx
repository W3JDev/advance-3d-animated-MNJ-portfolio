import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image?: string;
  stats?: {
    users?: string;
    performance?: string;
    impact?: string;
  };
}

interface ProjectShowcaseProps {
  project: Project;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="group perspective-1000 h-full"
    >
      <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 h-full transform-gpu">
        {/* Animated gradient border */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-50 blur-xl`}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="relative p-8 h-full flex flex-col">
          {/* Project header */}
          <div className="mb-6">
            <motion.h3 
              className="text-2xl font-bold text-white mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </div>
          
          {/* Tech stack */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {project.tech.map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + techIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Project stats */}
          {project.stats && (
            <motion.div 
              className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {project.stats.users && (
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{project.stats.users}</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
              )}
              {project.stats.performance && (
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{project.stats.performance}</div>
                  <div className="text-xs text-gray-400">Performance</div>
                </div>
              )}
              {project.stats.impact && (
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{project.stats.impact}</div>
                  <div className="text-xs text-gray-400">Impact</div>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Action buttons */}
          <motion.div 
            className="flex gap-3 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              size="sm"
              className={`flex-1 bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white border-0 transition-all duration-300 transform hover:scale-105`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        
        {/* Hover glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </motion.div>
  );
}