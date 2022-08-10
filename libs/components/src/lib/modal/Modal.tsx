import { ReactNode, MouseEventHandler } from 'react';
import { ModalContainer } from './ModalContainer';
import { ModalOverlay } from './ModalOverlay';
import { ModalWrapper } from './ModalWrapper';
import tw, { TwStyle } from 'twin.macro';

export interface ModalPropsBase {
  isOpen: boolean;
  color?: 'info' | 'danger';
}

interface ModalProps extends ModalPropsBase {
  children: ReactNode;
  title?: string;
  toggle?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

export interface IModalStyleVariant {
  info: TwStyle | string;
  danger: TwStyle | string;
}

const MODAL_STYLE: IModalStyleVariant = {
  info: tw`bg-blue-600`,
  danger: tw`bg-red-600`,
};

export const Modal = ({ children, isOpen, title, toggle, color = 'info', ...rest }: ModalProps) => (
  <ModalWrapper isOpen={isOpen}>
    <div tw="flex items-end justify-center min-h-screen pt-4 pb-20 px-4 text-center sm:block sm:p-0 z-40">
      <ModalOverlay isOpen={isOpen} onClick={toggle} />
      <span tw="hidden sm:inline-block sm:align-middle sm:h-screen" />
      <ModalContainer isOpen={isOpen} color={color}>
        <div css={MODAL_STYLE[color]}>
          <div tw="flex sm:items-start flex-col ">
            <div tw="flex w-full h-16 py-4 px-8 items-center justify-between" css={MODAL_STYLE[color]} {...rest}>
              <h3 tw="text-xl leading-6 font-bold text-white">{title}</h3>

              <button tw="text-white" onClick={toggle}>
                X
              </button>
            </div>

            <div tw="mt-3 text-center w-full px-8 sm:mt-0 sm:text-left bg-white">
              <div tw="py-8">
                <div tw="text-base text-black flex">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  </ModalWrapper>
);
