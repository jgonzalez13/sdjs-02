import styled from '@emotion/styled';
import tw from 'twin.macro';
import { IModalStyleVariant, ModalPropsBase } from './Modal';

const CONTAINER_SIZE: IModalStyleVariant = {
  info: `592px`,
  danger: `380px`,
};

export const ModalContainer = styled.div<ModalPropsBase>(({ color = 'info' }) => [
  tw`relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full z-40`,
  tw`ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ml-auto`,
  `max-width:${CONTAINER_SIZE[color]}`,
  ({ isOpen }) => isOpen && tw`ease-out duration-300 opacity-100 translate-y-0 sm:scale-100`,
]);
