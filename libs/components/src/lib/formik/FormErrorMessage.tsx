import 'twin.macro';

interface FormErrorMessageProps {
  error: string;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => (
  <div tw="capitalize text-red-600 text-xs mt-2">{error}</div>
);

export default FormErrorMessage;
