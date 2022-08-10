import React from 'react';
import { useField } from 'formik';
import { FormGroup } from './FormGroup';
import { Select } from '../select';
import 'twin.macro';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  label?: string;
  name: string;
  options: string[];
}

export const FormSelect = ({ name, label, disabled, options, ...rest }: FormSelectProps) => {
  const [field, meta] = useField(name);

  return (
    <FormGroup error={meta.error} label={label} name={name}>
      <Select {...rest} {...field} disabled={disabled} tw="capitalize">
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormGroup>
  );
};
