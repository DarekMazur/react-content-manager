import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { UserTypes } from '../../../types/dataTypes.ts';
import { FC } from 'react';

interface HeaderProps {
  user: UserTypes;
}

const Header: FC<HeaderProps> = (props) => {
  const { user } = props;
  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user && `Hello, ${user.username}!`}
        <Icon customIcon={user?.avatar} />
        <ul>
          <li>My profile</li>
          <li>Log out</li>
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Header;
