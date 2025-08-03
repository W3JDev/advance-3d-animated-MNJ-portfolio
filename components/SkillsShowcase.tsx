import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Code, 
  Database, 
  Palette, 
  Sparkles, 
  Cloud, 
  Shield, 
  Cpu,
  Globe,
  Layers,
  Zap,
  Target
} from 'lucide-react';

interface Skill {
  category: string;
  icon: React.ReactNode;
  level: number;
  gradient: string;
  description: string;
  technologies: string[];
  experience: string;
}

const skills: Skill[] = [
  {
    category: 'AI/ML Development',
    icon: <Brain className="w-8 h-8" />,
    level: 95,
    gradient: 'from-purple-600 to-pink-600',
    description: 'Building intelligent systems that learn, adapt, and solve complex problems',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'Hugging Face'],
    experience: '4+ Years'
  },
  {
    category: 'Full-Stack Development',
    icon: <Code className="w-8 h-8" />,
    level: 92,
    gradient: 'from-blue-600 to-purple-600',
    description: 'End-to-end application development from concept to deployment',
    technologies: ['React', 'Node.js', 'TypeScript', 'Next.js', 'Express', 'MongoDB'],
    experience: '6+ Years'
  },
  {
    category: 'Blockchain Technology',
    icon: <Database className="w-8 h-8" />,
    level: 88,
    gradient: 'from-green-600 to-blue-600',
    description: 'Decentralized solutions and smart contract development',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'Hardhat', 'MetaMask'],
    experience: '3+ Years'
  },
  {
    category: 'Cloud Architecture',
    icon: <Cloud className="w-8 h-8" />,
    level: 90,
    gradient: 'from-cyan-600 to-blue-600',
    description: 'Scalable cloud infrastructure and microservices architecture',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Lambda', 'EC2', 'RDS'],
    experience: '5+ Years'
  },
  {
    category: 'UI/UX Design',
    icon: <Palette className="w-8 h-8" />,
    level: 85,
    gradient: 'from-pink-600 to-red-600',
    description: 'Creating beautiful, intuitive user experiences that delight',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Tailwind CSS', 'Framer Motion'],
    experience: '4+ Years'
  },
  {
    category: 'DevOps & Security',
    icon: <Shield className="w-8 h-8" />,
    level: 87,
    gradient: 'from-red-600 to-purple-600',
    description: 'Secure deployment pipelines and infrastructure automation',
    technologies: ['GitHub Actions', 'Jenkins', 'Terraform', 'Nginx', 'SSL/TLS'],
    experience: '3+ Years'
  }
];

export function SkillsShowcase() {
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl mb-6"
            style={{
              fontWeight: '900',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Technical Mastery
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Deep expertise across the entire technology stack, from intelligent algorithms 
            to scalable cloud infrastructure
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                {/* Gradient border animation */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />
                
                {/* Content */}
                <CardContent className="p-8 relative z-10">
                  {/* Icon and Level */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.gradient} flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.icon}
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">{skill.level}%</div>
                      <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-xs">
                        {skill.experience}
                      </Badge>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {skill.category}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-300">Key Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + techIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 transition-colors font-light"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Hover shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                  animate={{
                    translateX: index % 2 === 0 ? ['100%', '100%'] : '-100%'
                  }}
                  transition={{ duration: 0.8 }}
                  whileHover={{
                    translateX: '100%'
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/25 border-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}