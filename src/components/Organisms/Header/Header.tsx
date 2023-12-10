import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';
import Nav from '../Nav/Nav.tsx';

interface HeaderProps {
  isAuthorised: boolean;
  user?: {
    userName: string;
    avatar?: string;
    uuid: string;
  };
}

const Header = (props: HeaderProps) => {
  const { isAuthorised, user } = props;
  return (
    <>
      {isAuthorised ? (
        <StyledHeader>
          <Nav />
          <div>
            {user && `Hello, ${user.userName}!`}
            <Icon customIcon={user?.avatar} />
          </div>
        </StyledHeader>
      ) : null}
    </>
  );
};

export default Header;
