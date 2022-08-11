import { ReactNode } from 'react';
import FormErrorMessage from './FormErrorMessage';
import tw from 'twin.macro';

interface FormGroupProps {
  children: ReactNode;
  disabled?: boolean;
  label?: string;
  error?: string;
  name: string;
}

export const FormGroup = ({ children, disabled, label, error, name }: FormGroupProps) => (
  <div tw="flex flex-col mb-3" css={disabled && tw`opacity-50`}>
    {label && (
      <label htmlFor={name} tw="inline-block mb-2 text-gray-700">
        {label}
      </label>
    )}

    {children}

    {error && <FormErrorMessage error={error} />}
  </div>
);
