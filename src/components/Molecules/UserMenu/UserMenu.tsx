import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledUserMenu } from './UserMenu.styles';
import { setUser } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserTypes } from '../../../types/dataTypes';
import Icon from '../../Atoms/Icon/Icon';

const UserMenu = ({
  user,
  isOpen,
  handleClick,
}: {
  user: UserTypes;
  isOpen?: boolean;
  handleClick: () => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMockLogout = () => {
    dispatch(setUser([]));
    navigate('/');
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        margin: '0',
      }}
    >
      <Icon customIcon={user?.avatar} handleClick={handleClick} />
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
    </div>
  );
};

export default UserMenu;
