import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  Calendar, 
  Users, 
  TrendingUp,
  Target,
  Lightbulb,
  Code,
  Rocket,
  Play,
  Eye,
  Download,
  Share,
  BookOpen,
  Zap,
  Award,
  CheckCircle,
  BarChart,
  Layers,
  Settings
} from 'lucide-react';

interface CaseStudyProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    challenge: string;
    solution: string;
    results: string[];
    features?: string[];
    impact?: {
      business: string;
      technical: string;
      user: string;
    };
    tech: string[];
    category: string;
    year: string;
    duration: string;
    teamSize: string;
    gradient: string;
    stats: Array<{
      metric: string;
      value: string;
    }>;
  };
  onClose: () => void;
}

export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const process = [
    {
      phase: 'Discovery',
      icon: <Lightbulb className="w-6 h-6" />,
      description: 'Understanding user needs, business requirements, and technical constraints'
    },
    {
      phase: 'Design',
      icon: <Target className="w-6 h-6" />,
      description: 'Creating user-centered solutions and robust system architecture'
    },
    {
      phase: 'Development',
      icon: <Code className="w-6 h-6" />,
      description: 'Building scalable, maintainable solutions with best practices'
    },
    {
      phase: 'Launch',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Deployment, monitoring, and continuous optimization'
    }
  ];

  const keyMetrics = [
    { label: 'Development Time', value: project.duration, icon: <Calendar className="w-5 h-5" /> },
    { label: 'Team Size', value: project.teamSize, icon: <Users className="w-5 h-5" /> },
    { label: 'Technology Stack', value: `${project.tech.length}+ technologies`, icon: <Layers className="w-5 h-5" /> },
    { label: 'Project Year', value: project.year, icon: <Award className="w-5 h-5" /> }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen py-8 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
            >
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Back to Projects
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className={`bg-gradient-to-r ${project.gradient} text-white border-0 rounded-xl font-semibold px-6`}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Source Code
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 px-4 py-2 text-sm font-medium">
                    {project.category}
                  </Badge>
                  
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                    {project.title}
                  </h1>
                  
                  <p className="text-2xl text-gray-300 leading-relaxed font-light mb-12">
                    {project.longDescription}
                  </p>
                  
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {keyMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="text-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="text-purple-400 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                          {metric.icon}
                        </div>
                        <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                        <div className="text-white font-bold text-lg">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Showcase */}
                <div className="relative">
                  {/* Main showcase card with 3D effect */}
                  <motion.div
                    className="relative h-96 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-black/50 rounded-3xl overflow-hidden border border-white/20 backdrop-blur-xl"
                    whileHover={{ rotateX: 5, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Grid pattern */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />
                    
                    {/* Central play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className={`absolute inset-0 w-24 h-24 bg-gradient-to-r ${project.gradient} rounded-full blur-xl opacity-60`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="relative w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 cursor-pointer">
                          <Play className="w-10 h-10 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Corner badges */}
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-black/50 text-white border-white/20 font-medium">
                        Interactive Demo
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-6 right-6 flex gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </motion.div>

                  {/* Impact Statistics Floating Cards */}
                  <motion.div
                    className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <BarChart className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats[0]?.value}</div>
                    <div className="text-xs text-gray-400">{project.stats[0]?.metric}</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  >
                    <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats[1]?.value}</div>
                    <div className="text-xs text-gray-400">{project.stats[1]?.metric}</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Challenge, Solution, Results - Premium 3D Enhanced */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {/* The Challenge Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-black/50 backdrop-blur-xl border border-white/20 hover:border-red-400/40 transition-all duration-500 relative overflow-hidden">
                  {/* Premium 3D gradient border animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500"
                  />

                  {/* 3D depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-1 bg-gradient-to-br from-red-500/10 to-transparent rounded-xl opacity-50" />
                  <div className="absolute inset-2 bg-gradient-to-br from-red-500/5 to-transparent rounded-lg opacity-30" />

                  <CardContent className="p-10 relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center border border-red-400/30 shadow-2xl relative"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(239, 68, 68, 0.3)",
                            "0 0 30px rgba(249, 115, 22, 0.4)",
                            "0 0 20px rgba(239, 68, 68, 0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.1, rotateY: 15 }}
                      >
                        {/* 3D highlight */}
                        <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
                        <Target className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                        The Challenge
                      </h3>
                    </div>
                    <p className="text-white leading-relaxed font-medium text-lg tracking-wide">
                      {project.challenge}
                    </p>

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
                        repeatDelay: 6
                      }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>

              {/* The Solution Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-black/50 backdrop-blur-xl border border-white/20 hover:border-blue-400/40 transition-all duration-500 relative overflow-hidden">
                  {/* Premium 3D gradient border animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500"
                  />

                  {/* 3D depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl opacity-50" />
                  <div className="absolute inset-2 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg opacity-30" />

                  <CardContent className="p-10 relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center border border-blue-400/30 shadow-2xl relative"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(59, 130, 246, 0.3)",
                            "0 0 30px rgba(147, 51, 234, 0.4)",
                            "0 0 20px rgba(59, 130, 246, 0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        whileHover={{ scale: 1.1, rotateY: 15 }}
                      >
                        {/* 3D highlight */}
                        <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
                        <Lightbulb className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-white leading-relaxed font-medium text-lg tracking-wide">
                      {project.solution}
                    </p>

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
                        repeatDelay: 6,
                        delay: 2
                      }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>

              {/* The Results Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-black/50 backdrop-blur-xl border border-white/20 hover:border-green-400/40 transition-all duration-500 relative overflow-hidden">
                  {/* Premium 3D gradient border animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500"
                  />

                  {/* 3D depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-1 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-50" />
                  <div className="absolute inset-2 bg-gradient-to-br from-green-500/5 to-transparent rounded-lg opacity-30" />

                  <CardContent className="p-10 relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center border border-green-400/30 shadow-2xl relative"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(34, 197, 94, 0.3)",
                            "0 0 30px rgba(16, 185, 129, 0.4)",
                            "0 0 20px rgba(34, 197, 94, 0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                        whileHover={{ scale: 1.1, rotateY: 15 }}
                      >
                        {/* 3D highlight */}
                        <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
                        <TrendingUp className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                        The Results
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {project.results.slice(0, 4).map((result, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                          </motion.div>
                          <span className="text-white font-medium text-lg leading-relaxed tracking-wide">{result}</span>
                        </motion.div>
                      ))}
                    </div>

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
                        repeatDelay: 6,
                        delay: 4
                      }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Key Features */}
            {project.features && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-20"
              >
                <h3 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <Settings className="w-4 h-4 text-purple-400" />
                            </div>
                            <h4 className="text-white font-semibold group-hover:text-purple-200 transition-colors">
                              {feature}
                            </h4>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Impact Analysis */}
            {project.impact && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-20"
              >
                <h3 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
                  <Award className="w-8 h-8 text-purple-400" />
                  Project Impact
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: 'Business Impact', description: project.impact.business, color: 'from-green-500 to-emerald-500', icon: TrendingUp },
                    { title: 'Technical Achievement', description: project.impact.technical, color: 'from-blue-500 to-purple-500', icon: Code },
                    { title: 'User Experience', description: project.impact.user, color: 'from-pink-500 to-red-500', icon: Eye }
                  ].map((impact, index) => (
                    <motion.div
                      key={impact.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                        <CardContent className="p-8 text-center">
                          <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${impact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <impact.icon className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-4">{impact.title}</h4>
                          <p className="text-gray-300 leading-relaxed font-light">{impact.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Development Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-20"
            >
              <h3 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                Development Process
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {process.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
                      <CardContent className="p-8 text-center">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {phase.icon}
                        </motion.div>
                        <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {phase.phase}
                        </h4>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">{phase.description}</p>
                      </CardContent>
                      
                      {/* Connecting line */}
                      {index < process.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-20"
            >
              <h3 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
                <Layers className="w-8 h-8 text-green-400" />
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {project.tech.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="w-full justify-center bg-black/60 text-white border-white/30 hover:bg-black/80 transition-all duration-300 px-4 py-3 text-base font-medium rounded-xl"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border border-purple-500/40 backdrop-blur-xl">
                <CardContent className="p-16">
                  <h3 className="text-4xl font-bold text-white mb-6">Ready for Similar Results?</h3>
                  <p className="text-2xl text-white mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                    Let's discuss how I can help transform your business with intelligent technology solutions that deliver real, measurable impact.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-full text-xl font-bold border-0 shadow-2xl"
                    >
                      <Eye className="w-6 h-6 mr-3" />
                      Start Your Project
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/20 px-10 py-5 rounded-full text-xl font-medium backdrop-blur-sm"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      Download Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}