import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ProblemSolutionCard = ({ problem, solution, index = 0 }) => {
  const [flipped, setFlipped] = useState(false);

  const CardContent = ({ isFlipped }) => (
    <div className="flex w-full">
      {!isFlipped ? (
        <>
          <div className="w-[90%] bg-destructive/50 border border-destructive/40 flex items-center px-4 sm:px-6 py-4 gap-3">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive flex-shrink-0" />
            <div>
              <h4 className="font-medium text-xs uppercase tracking-wider mb-1 text-foreground/50">Problema</h4>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-snug">{problem}</p>
            </div>
          </div>
          <div className="w-[10%] bg-primary/50 border border-primary/20 flex items-center justify-center min-h-full">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
        </>
      ) : (
        <>
          <div className="w-[10%] bg-destructive/50 border border-destructive/20 flex items-center justify-center min-h-full">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
          </div>
          <div className="w-[90%] bg-primary/45 border border-primary/20 flex items-center px-4 sm:px-6 py-4 gap-3">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-medium text-xs uppercase tracking-wider mb-1 text-foreground/50">Solución DOMAKEA</h4>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-snug">{solution}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className="relative rounded-2xl overflow-hidden">
        {/* Elemento invisible para mantener el tamaño durante la transición */}
        <div className="invisible">
          <CardContent isFlipped={flipped} />
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            key={flipped ? 'solution' : 'problem'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: flipped ? '-100%' : '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <CardContent isFlipped={flipped} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-2">
        {flipped ? 'Clic para ver el problema' : 'Clic para ver la solución'}
      </p>
    </motion.div>
  );
};

export default ProblemSolutionCard;