import { ReactNode } from 'react';
import Title from './Card.Tittle';
import Body from './Card.Body';
import 'twin.macro';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
}

export const Card: any = ({ children, onClick, ...rest }: CardProps) => {
  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onClick) onClick();
  };
  return (
    <div {...rest} tw="block rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#card" tw="flex justify-center" onClick={handleOnClick}>
        <div tw="p-6 w-full">{children}</div>
      </a>
    </div>
  );
};

Card.Title = Title;
Card.Body = Body;
