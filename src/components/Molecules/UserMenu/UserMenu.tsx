import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledUserMenu } from './UserMenu.styles';
import { setUser } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserTypes } from '../../../types/dataTypes';

const UserMenu = ({ user, isOpen }: { user: UserTypes; isOpen?: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMockLogout = () => {
    dispatch(setUser([]));
    navigate('/');
  };

  return (
    <StyledUserMenu $open={isOpen}>
      <ul>
        <li>
          <a href={`/user/${user.uuid}`}>
            <FontAwesomeIcon icon={['fas', 'user']} />
            My profile
          </a>
        </li>
        <li onClick={handleMockLogout}>
          <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} />
          Log out
        </li>
      </ul>
    </StyledUserMenu>
  );
};

export default UserMenu;
