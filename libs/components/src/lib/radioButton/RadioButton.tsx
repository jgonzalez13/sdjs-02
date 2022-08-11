import React, { ReactNode } from 'react';
import { RadioInput } from './RadioInput';
import 'twin.macro';

interface RadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  children?: ReactNode;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton = ({ children, checked, name, value, onChange, ...rest }: RadioButtonProps) => {
  return (
    <div {...rest}>
      <RadioInput checked={checked} type="radio" name={name} value={value} onChange={onChange} />

      <label tw="inline-block text-gray-800" htmlFor={name}>
        {children}
      </label>
    </div>
  );
};
