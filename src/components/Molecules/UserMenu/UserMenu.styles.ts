import { styled } from 'styled-components';

interface StyledUserMenuTypes {
  $open?: boolean;
}

export const StyledUserMenu = styled.div<StyledUserMenuTypes>`
  position: absolute;
  right: 0;
  top: 5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  transform-origin: 0 0;
  transform: ${({ $open }) => ($open ? 'scaleY(1)' : 'scaleY(0)')};
  transition: transform 0.2s ease-in-out;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding: 2rem 0;
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;

      svg {
        font-size: 1.2rem;
        padding-right: 1rem;
      }

      a {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.white};
        text-decoration: none;
      }
    }
  }
`;
