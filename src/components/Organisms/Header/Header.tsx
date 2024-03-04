import { StyledHeader } from './Header.styles.ts';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { FC, useState } from 'react';
import UserMenu from '../../Molecules/UserMenu/UserMenu.tsx';
import { useTranslation } from 'react-i18next';
import { IStrapiUser } from '../../../types/userTypes.ts';
import Logo from '../../../assets/rcm4s_logo.svg';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  user: IStrapiUser;
}

const Header: FC<IHeaderProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <StyledHeader>
      <div>
        <Link to={`/`}>
          <img src={Logo} alt="" />
        </Link>
        <MenuList />
      </div>
      <div>
        {user &&
          t('navigation.userArea.greetings', { username: user.username })}
        <UserMenu user={user} isOpen={isOpen} handleClick={handleClick} />
      </div>
    </StyledHeader>
  );
};

export default Header;
