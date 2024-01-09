import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { UserTypes } from '../../../types/dataTypes.ts';
import { FC, useState } from 'react';
import UserMenu from '../../Molecules/UserMenu/UserMenu.tsx';

interface HeaderProps {
  user: UserTypes;
}

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
