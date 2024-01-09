import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { UserTypes } from '../../../types/dataTypes.ts';
import { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/index.ts';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: UserTypes;
}

export const StyledUserMenu = styled.div`
  ul {
    padding: 0;
    list-style: none;

    li {
      color: ${({ theme }) => theme.colors.white};

      a {
        color: ${({ theme }) => theme.colors.white};
        text-decoration: none;
      }
    }
  }
`;

const UserMenu = ({ user }: { user: UserTypes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMockLogout = () => {
    dispatch(setUser([]));
    navigate('/');
  };

  return (
    <StyledUserMenu>
      <ul>
        <li>
          <a href={`/user/${user.uuid}`} target="_blank">
            My profile
          </a>
        </li>
        <li onClick={handleMockLogout} style={{ cursor: 'pointer' }}>
          Log out
        </li>
      </ul>
    </StyledUserMenu>
  );
};

const Header: FC<HeaderProps> = (props) => {
  const { user } = props;
  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user && `Hello, ${user.username}!`}
        <Icon customIcon={user?.avatar} />
        <UserMenu user={user} />
      </div>
    </StyledHeader>
  );
};

export default Header;
