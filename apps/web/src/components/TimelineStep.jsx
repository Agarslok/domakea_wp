import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TimelineStep = ({ number, title, description, isLast, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
          {number}
        </div>
        {!isLast && (
          <div className="hidden md:block w-0.5 h-16 bg-primary/30 mt-4" />
        )}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="text-2xl font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-lg text-secondary-foreground/70 leading-relaxed">{description}</p>
      </div>
      {!isLast && (
        <ArrowRight className="hidden lg:block h-6 w-6 text-primary mt-3 flex-shrink-0" />
      )}
    </motion.div>
  );
};

export default TimelineStep;