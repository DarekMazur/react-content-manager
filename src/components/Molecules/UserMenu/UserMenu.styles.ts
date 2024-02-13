import { styled } from 'styled-components';

interface IStyledUserMenuTypes {
  $open?: boolean;
  // ref: MutableRefObject<Node | undefined>;
}

export const StyledUserMenu = styled.div<IStyledUserMenuTypes>`
  width: 14rem;
  height: 5rem;
  position: absolute;
  top: -3rem;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
  z-index: 0;

  ul {
    padding: 1rem;
    margin: 0;
    list-style: none;
    width: 14rem;
    height: 15rem;
    border-radius: 0 0 0 1rem;
    position: absolute;
    background: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
    opacity: ${({ $open }) => ($open ? '1' : '0')};
    top: ${({ $open }) => ($open ? '7rem' : '-13rem')};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    transition:
      opacity 0.2s ease-in,
      top 0.2s ease-in,
      width 0.1s ease-in;

    li {
      opacity: 0.8;
      text-decoration: none;
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

      &:hover {
        transition: 0.2s;
        opacity: 1;
      }

      &:last-of-type {
        opacity: 1;
      }
    }
  }
`;
