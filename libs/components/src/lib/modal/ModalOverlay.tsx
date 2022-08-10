import styled from '@emotion/styled';
import tw from 'twin.macro';
import { ModalPropsBase } from './Modal';

export const ModalOverlay = styled.div<ModalPropsBase>([
  tw`fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity ease-in duration-200 opacity-0 w-full h-full z-30`,
  ({ isOpen }) => isOpen && tw`ease-out duration-300 opacity-100`,
]);
