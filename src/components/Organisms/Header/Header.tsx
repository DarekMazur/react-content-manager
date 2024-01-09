import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { UserTypes } from '../../../types/dataTypes.ts';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/index.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
  user: UserTypes;
}

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

const UserMenu = ({ user, isOpen }: { user: UserTypes; isOpen?: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMockLogout = () => {
    dispatch(setUser([]));
    navigate('/');
  };

  return (
    <StyledUserMenu $open={isOpen}>
      <ul>
        <li>
          <a href={`/user/${user.uuid}`}>
            <FontAwesomeIcon icon={['fas', 'user']} />
            My profile
          </a>
        </li>
        <li onClick={handleMockLogout}>
          <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} />
          Log out
        </li>
      </ul>
    </StyledUserMenu>
  );
};

const Header: FC<HeaderProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user && `Hello, ${user.username}!`}
        <Icon customIcon={user?.avatar} handleClick={handleClick} />
        <UserMenu user={user} isOpen={isOpen} />
      </div>
    </StyledHeader>
  );
};

export default Header;
