import { useField } from 'formik';
import { FormGroup } from './FormGroup';
import { Input } from '../input';
import 'twin.macro';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  disabled?: boolean;
}

export const FormField = ({ name, label, disabled, ...rest }: FormFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <FormGroup error={meta.error} label={label} name={name}>
      <Input {...rest} {...field} disabled={disabled} />
    </FormGroup>
  );
};
