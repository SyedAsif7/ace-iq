import React from 'react';
import { cn } from './cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
  <div className={cn('bg-white rounded-3xl border border-slate-100 shadow-sm', className)}>
    {children}
  </div>
);
