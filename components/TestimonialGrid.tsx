import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -12, scale: 1.02 }}
          className="h-full group"
        >
          <Card className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 relative overflow-hidden">
            {/* Premium 3D gradient border animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
            />

            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* 3D depth layers */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-50" />
            <div className="absolute inset-2 bg-gradient-to-br from-white/3 to-transparent rounded-lg opacity-30" />

            <CardContent className="p-8 h-full flex flex-col relative z-10">
              {/* Premium quote icon with 3D effect */}
              <motion.div
                className="absolute top-6 right-6 text-white/30 group-hover:text-white/60 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{
                  rotateY: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Quote className="w-10 h-10 drop-shadow-lg" />
              </motion.div>

              {/* Enhanced rating with glow */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : 'text-gray-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Premium content with better typography */}
              <blockquote className="text-white leading-relaxed mb-8 flex-1 text-lg font-medium">
                <span className="text-white/80">"</span>
                <span className="text-gray-100">{testimonial.content}</span>
                <span className="text-white/80">"</span>
              </blockquote>

              {/* Enhanced author section with 3D avatar */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg relative"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                      "0 0 30px rgba(236, 72, 153, 0.4)",
                      "0 0 20px rgba(168, 85, 247, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* 3D highlight */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                  <span className="relative z-10">{testimonial.name.charAt(0)}</span>
                </motion.div>
                <div>
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-gray-300 text-sm font-medium">
                    {testimonial.role} at <span className="text-purple-300">{testimonial.company}</span>
                  </div>
                </div>
              </div>

              {/* Premium shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-32 -translate-x-full"
                animate={{
                  translateX: ['0%', '200%']
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}