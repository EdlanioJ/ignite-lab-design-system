import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface RootProps {
  children: ReactNode;
}

function Root({ children }: RootProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded bg-gray-800 w-full focus-within:ring-2 ring-cyan-300 ">
      {children}
    </div>
  );
}

Root.displayName = 'TextInput.Root';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-gray-100 text-xs outline-none placeholder:text-gray-400"
      {...props}
    />
  );
}
Input.displayName = 'TextInput.Input';

export interface IconProps {
  children: ReactNode;
}

function Icon({ children }: IconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>;
}

Icon.displayName = 'TextInput.Icon';

export const TextInput = {
  Input,
  Root,
  Icon,
};
