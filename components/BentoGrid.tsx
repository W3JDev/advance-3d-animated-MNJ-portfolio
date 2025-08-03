import { motion } from 'framer-motion';
import { Card } from './ui/card';

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  gradient: string;
  content?: React.ReactNode;
}

interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'medium': return 'col-span-2 row-span-1 md:col-span-1 md:row-span-2';
      case 'large': return 'col-span-2 row-span-2';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={getSizeClasses(item.size)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className={`h-full bg-gradient-to-br ${item.gradient} border-0 overflow-hidden group cursor-pointer relative`}>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
            <div className="relative p-6 h-full flex flex-col justify-between text-white">
              <div>
                {item.icon && (
                  <motion.div 
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
              {item.content && (
                <div className="mt-4">
                  {item.content}
                </div>
              )}
            </div>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}