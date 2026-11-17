import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({ name, description, price, onLearnMore, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 group">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {price && (
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">{price}</span>
              <span className="text-muted-foreground ml-2">por proyecto</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button
            onClick={onLearnMore}
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          >
            Ver detalles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;