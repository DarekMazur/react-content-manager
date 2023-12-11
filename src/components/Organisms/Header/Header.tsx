import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';

interface HeaderProps {
  user?: {
    userName: string;
    avatar?: string;
    uuid: string;
  };
}

const Header = (props: HeaderProps) => {
  const { user } = props;
  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user && `Hello, ${user.userName}!`}
        <Icon customIcon={user?.avatar} />
      </div>
    </StyledHeader>
  );
};

export default Header;
