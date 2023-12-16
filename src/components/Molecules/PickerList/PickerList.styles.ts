import { styled } from 'styled-components';

interface StyledPickerProps {
  $expand: boolean;
}

export const StyledPickerList = styled.ul<StyledPickerProps>`
  list-style: none;
  display: ${({ $expand }) => ($expand ? 'block' : 'none')};
  position: absolute;
  left: 0;
  top: 1rem;
  padding: 0;
  width: 5rem;
  text-align: center;
  cursor: pointer;
`;
