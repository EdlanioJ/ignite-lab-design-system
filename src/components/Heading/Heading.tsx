import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export interface HeadingProps {
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  asChild: boolean;
}

export function Heading({ asChild, children, size }: HeadingProps) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      className={clsx('text-gray-100 font-bold font-sans', {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg',
      })}
    >
      {children}
    </Comp>
  );
}
