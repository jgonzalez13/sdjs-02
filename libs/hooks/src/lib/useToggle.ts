import { useState } from 'react';

export const useToggle = (): [boolean, () => void] => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const toggle = () => setIsToggle(!isToggle);

  return [isToggle, toggle];
};
