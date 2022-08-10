import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

interface ButtonProps {
  color?: 'danger' | 'primary' | 'success';
}

interface ButtonStyleProps {
  danger?: TwStyle;
  primary?: TwStyle;
  success?: TwStyle;
}

const BUTTON_STYLE: ButtonStyleProps = {
  danger: tw` bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800`,
  primary: tw`bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`,
  success: tw` bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800`,
};

export const Button = styled.button(({ color = 'primary' }: ButtonProps) => [
  tw`inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`,
  BUTTON_STYLE[color as keyof typeof BUTTON_STYLE],
]);
