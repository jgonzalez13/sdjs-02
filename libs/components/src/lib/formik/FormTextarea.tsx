import React from 'react';
import { useField } from 'formik';
import { FormGroup } from './FormGroup';
import { TextArea } from '../textarea';
import 'twin.macro';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  disabled?: boolean;
}

export const FormTextarea = ({ name, label, disabled, ...rest }: FormTextareaProps) => {
  const [field, meta] = useField(name);

  return (
    <FormGroup error={meta.error} label={label} name={name}>
      <TextArea {...rest} {...field} disabled={disabled} rows={5} />
    </FormGroup>
  );
};
