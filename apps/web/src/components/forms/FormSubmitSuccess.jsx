import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormSubmitSuccess({
  title,
  description,
  detail,
  actionLabel = 'Llenar otro formulario',
  onReset,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="rounded-3xl border border-primary/25 bg-primary/5 px-6 py-10 sm:px-10 sm:py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 320, damping: 18 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_12px_40px_-8px_rgba(255,195,15,0.85)]"
      >
        <CheckCircle2 className="h-9 w-9 text-primary-foreground" strokeWidth={2.25} />
      </motion.div>

      <p className="mono-label mb-2 text-muted-foreground">Confirmación</p>
      <h3 className="font-display text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">{description}</p>
      {detail ? <p className="text-sm text-muted-foreground/90 mt-3 max-w-md mx-auto">{detail}</p> : null}

      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="mt-8 h-12 rounded-full px-8 border-primary/30 hover:bg-primary/10"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        {actionLabel}
      </Button>
    </motion.div>
  );
}