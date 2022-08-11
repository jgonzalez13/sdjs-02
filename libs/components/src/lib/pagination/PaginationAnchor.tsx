import styled from '@emotion/styled';
import tw from 'twin.macro';

interface PaginationAnchorProps {
  active?: boolean;
  disabled?: boolean;
}

const PaginationAnchor = styled.a(({ active, disabled }: PaginationAnchorProps) => [
  tw`relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded`,
  tw`text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`,
  active && tw`bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md`,
  disabled && tw`text-gray-500 hover:text-gray-500 pointer-events-none`,
]);

export default PaginationAnchor;
