import { ReactNode } from 'react';
import 'twin.macro';

interface BodyProps {
  children: ReactNode | string;
}

const MAX_DESCRIPTION_LENGTH = 120;

const Body = ({ children }: BodyProps) => {
  const isString = typeof children === 'string';
  let transformBody;
  let isLongBody = false;

  if (isString) {
    transformBody = children.substring(0, MAX_DESCRIPTION_LENGTH);
    isLongBody = transformBody.length >= MAX_DESCRIPTION_LENGTH;
  }

  return (
    <p tw="text-gray-700 text-base mb-4">
      {isString ? transformBody : children}
      {isLongBody && '...'}
    </p>
  );
};

export default Body;
