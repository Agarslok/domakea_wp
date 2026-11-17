import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, company, comment, photo, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid mb-6"
    >
      <div className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
        <Quote className="h-8 w-8 text-primary mb-4" />
        <p className="text-foreground leading-relaxed mb-6 italic">"{comment}"</p>
        <div className="flex items-center gap-4">
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;