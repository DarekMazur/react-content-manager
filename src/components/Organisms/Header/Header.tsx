import { StyledHeader } from './Header.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../../utils/themes/theme.ts';

interface HeaderProps {
  isAuthorised: boolean;
  user?: {
    userName: string;
    avatar?: string;
    uuid: string;
  };
}
interface IconProps {
  customIcon?: string;
}

const Icon = (props: IconProps) => {
  const { customIcon } = props;
  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: theme.colors.blue,
        width: '3.5rem',
        height: '3.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
        marginRight: '2rem',
      }}
    >
      {customIcon ? (
        <img
          style={{
            width: '4rem',
            height: '4rem',
            objectFit: 'cover',
            objectPosition: 'center 0.2rem',
          }}
          src={customIcon}
          alt=""
        />
      ) : (
        <FontAwesomeIcon
          style={{
            fontSize: '3rem',
            color: theme.colors.lightBlue,
          }}
          icon={['fas', 'user']}
        />
      )}
    </div>
  );
};

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
