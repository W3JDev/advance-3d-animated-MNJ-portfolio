import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Coffee, 
  Brain, 
  Code, 
  Heart, 
  Lightbulb, 
  Target,
  ArrowRight,
  Quote,
  Sparkles
} from 'lucide-react';
import { TypewriterEffect } from './TypewriterEffect';

export function DetailedAbout() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showSecondParagraph, setShowSecondParagraph] = useState(false);
  const [showThirdParagraph, setShowThirdParagraph] = useState(false);
  const [showFourthParagraph, setShowFourthParagraph] = useState(false);

  const highlights = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: '11 Years in F&B',
      description: 'From floor service to kitchen management',
      gradient: 'from-amber-600 to-orange-600'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Self-Taught AI Expert',
      description: 'Mastered machine learning through passion',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Full-Stack Mastery',
      description: 'From frontend beauty to backend power',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Creative Technologist',
      description: 'Where art meets algorithm',
      gradient: 'from-pink-600 to-red-600'
    }
  ];

  const journey = [
    {
      year: '2013',
      title: 'The Beginning',
      description: 'Started my journey in the F&B industry, learning the fundamentals of service, operations, and customer experience.'
    },
    {
      year: '2018',
      title: 'Digital Awakening',
      description: 'Discovered programming and fell in love with the power of code to solve real-world problems.'
    },
    {
      year: '2021',
      title: 'AI Revolution',
      description: 'Dove deep into artificial intelligence and machine learning, seeing the potential to transform industries.'
    },
    {
      year: '2024',
      title: 'The Synthesis',
      description: 'Combined 11 years of F&B expertise with cutting-edge technology to create revolutionary solutions.'
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Typewriter Effect */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl mb-8 font-light">
            <TypewriterEffect
              text="The Story Behind"
              speed={80}
              className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
              onComplete={() => setShowMainContent(true)}
            />
          </h2>
          
          {showMainContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TypewriterEffect
                text="JEWEL"
                speed={120}
                className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block"
                startDelay={300}
              />
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Narrative Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quote */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-purple-400 mb-4 opacity-60" />
                <blockquote className="text-xl text-gray-200 font-light leading-relaxed italic">
                  "I don't just write code—I craft experiences. Every algorithm I create, 
                  every system I architect, is born from understanding real human needs 
                  through years of hands-on service."
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <div className="text-white font-semibold">Jewel</div>
                    <div className="text-gray-400 text-sm">Full-Stack AI Architect</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main narrative with progressive reveal */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TypewriterEffect
                  text="My journey began in the bustling world of restaurants—11 years of understanding people, processes, and the intricate dance of service excellence. From serving tables to managing kitchens, I learned that technology should serve humanity, not the other way around."
                  speed={25}
                  className="text-lg text-gray-300 leading-relaxed font-light"
                  startDelay={1000}
                  onComplete={() => setShowSecondParagraph(true)}
                />
              </motion.div>

              {showSecondParagraph && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TypewriterEffect
                    text="As a self-taught polymath, I discovered the power of code to solve real problems. But unlike traditional developers who learned in classrooms, I learned in the trenches—where every solution had to work under pressure, where efficiency meant the difference between success and chaos."
                    speed={25}
                    className="text-lg text-gray-300 leading-relaxed font-light"
                    startDelay={500}
                    onComplete={() => setShowThirdParagraph(true)}
                  />
                </motion.div>
              )}

              {showThirdParagraph && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TypewriterEffect
                    text="Today, I bridge two worlds: the human-centered wisdom of hospitality and the infinite possibilities of artificial intelligence. This unique perspective allows me to create technology that doesn't just function—it feels natural, intuitive, and genuinely helpful."
                    speed={25}
                    className="text-lg text-gray-300 leading-relaxed font-light"
                    startDelay={500}
                    onComplete={() => setShowFourthParagraph(true)}
                  />
                </motion.div>
              )}

              {showFourthParagraph && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TypewriterEffect
                    text="When I build AI systems, I think about the restaurant manager who needs predictions that actually help. When I design interfaces, I remember the server who has 30 seconds to input an order. When I architect blockchain solutions, I consider the supplier who needs transparency they can trust."
                    speed={25}
                    className="text-lg text-gray-300 leading-relaxed font-light"
                    startDelay={500}
                  />
                </motion.div>
              )}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold border-0 group">
                <span className="flex items-center">
                  Let's Create Together
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Highlights & Journey */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Key Highlights */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                What Makes Me Different
              </h3>
              <div className="grid gap-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center text-white group-hover:scale-105 transition-transform`}>
                            {highlight.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{highlight.title}</h4>
                            <p className="text-gray-400 text-sm font-light">{highlight.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Journey Timeline */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-400" />
                My Journey
              </h3>
              <div className="space-y-4">
                {journey.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Card className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 font-bold">
                            {milestone.year}
                          </Badge>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2">{milestone.title}</h4>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}