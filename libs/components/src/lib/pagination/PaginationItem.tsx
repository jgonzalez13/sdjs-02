import React, { ReactNode } from 'react';
import PaginationAnchor from './PaginationAnchor';

interface PaginationItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const PaginationItem = ({ active, children, disabled, onClick, ...rest }: PaginationItemProps) => {
  const onclick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onClick) onClick();
  };

  return (
    <li>
      <PaginationAnchor {...rest} active={active} disabled={disabled} href="#" onClick={onclick}>
        {children}
      </PaginationAnchor>
    </li>
  );
};

export default PaginationItem;
