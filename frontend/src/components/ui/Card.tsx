import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={twMerge('rounded-3xl border border-slate-200 bg-white p-6 shadow-sm', className)} {...props} />;
}
