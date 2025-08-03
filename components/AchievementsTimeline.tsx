import { motion } from 'framer-motion';
import { Trophy, Award, Star, Zap } from 'lucide-react';

const achievements = [
  {
    year: '2024',
    title: 'AI Innovation Award',
    description: 'Recognized for revolutionary F&B analytics platform',
    icon: Trophy,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    year: '2023',
    title: 'Blockchain Pioneer',
    description: 'Led development of industry-first supply chain solution',
    icon: Award,
    color: 'from-green-400 to-blue-500'
  },
  {
    year: '2022',
    title: 'Tech Polymath Recognition',
    description: 'Featured in top 50 self-taught developers globally',
    icon: Star,
    color: 'from-purple-400 to-pink-500'
  },
  {
    year: '2021',
    title: 'Industry Transformation',
    description: '11 years F&B expertise meets cutting-edge tech',
    icon: Zap,
    color: 'from-blue-400 to-purple-500'
  }
];

export function AchievementsTimeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
      
      <div className="space-y-12">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.year}
            className="relative flex items-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100 
            }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <motion.div
              className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <achievement.icon className="w-8 h-8 text-white" />
              
              {/* Pulsing ring */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${achievement.color} opacity-30`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Content */}
            <motion.div
              className="ml-8 flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                    {achievement.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {achievement.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}