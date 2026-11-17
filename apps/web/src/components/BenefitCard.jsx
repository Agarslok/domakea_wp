import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap, Target, Users, TrendingUp, CheckCircle, Headphones } from 'lucide-react';

const iconMap = {
  BarChart3,
  Zap,
  Target,
  Users,
  TrendingUp,
  Headphones,
  CheckCircle
};

const BenefitCard = ({ icon, title, description, index = 0 }) => {
  const IconComponent = iconMap[icon] || CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-start p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="mb-4 p-3 rounded-xl bg-primary/10">
        <IconComponent className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default BenefitCard;