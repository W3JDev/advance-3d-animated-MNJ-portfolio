import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card } from './ui/card';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface InteractiveFAQProps {
  faqs: FAQItem[];
}

export function InteractiveFAQ({ faqs }: InteractiveFAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <motion.button
              className="w-full p-6 text-left flex items-center justify-between group"
              onClick={() => toggleItem(faq.id)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/60 group-hover:text-white/80"
              >
                {openItems.has(faq.id) ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openItems.has(faq.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}