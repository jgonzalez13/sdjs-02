import styled from '@emotion/styled';
import tw from 'twin.macro';
import { ModalPropsBase } from './Modal';

export const ModalWrapper = styled.div<ModalPropsBase>([
  tw`fixed z-10 inset-0 overflow-y-auto invisible z-40`,
  ({ isOpen }) => isOpen && tw`visible`,
]);
