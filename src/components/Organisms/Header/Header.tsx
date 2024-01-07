import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import MenuList from '../../Molecules/MenuList/MenuList.tsx';
import { UserTypes } from '../../../types/dataTypes.ts';

interface HeaderProps {
  user: UserTypes;
}

const Header = (props: HeaderProps) => {
  const { user } = props;
  return (
    <StyledHeader>
      <MenuList />
      <div>
        {user && `Hello, ${user.username}!`}
        <Icon customIcon={user?.avatar} />
      </div>
    </StyledHeader>
  );
};

export default Header;
