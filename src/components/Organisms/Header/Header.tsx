import { StyledHeader } from './Header.styles.ts';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { IUserTypes } from '../../../types/dataTypes.ts';
import { FC, useState } from 'react';
import UserMenu from '../../Molecules/UserMenu/UserMenu.tsx';
import { useTranslation } from 'react-i18next';

interface IHeaderProps {
  user: IUserTypes;
}

const Header: FC<IHeaderProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user &&
          t('navigation.userArea.greetings', { username: user.username })}
        <UserMenu user={user} isOpen={isOpen} handleClick={handleClick} />
      </div>
    </StyledHeader>
  );
};

export default Header;
