import { StyledHeader } from './Header.styles.ts';
import Icon from '../../Atoms/Icon/Icon.tsx';

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
          {user && `Hello, ${user.userName}!`}
          <Icon customIcon={user?.avatar} />
        </StyledHeader>
      ) : null}
    </>
  );
};

export default Header;
