import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledUserMenu } from './UserMenu.styles';
import { setUser } from '../../../store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserTypes } from '../../../types/dataTypes';
import Icon from '../../Atoms/Icon/Icon';
import { useEffect, useRef } from 'react';

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
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      isOpen &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      handleClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleMockLogout = () => {
    dispatch(setUser([]));
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        margin: '0',
      }}
      ref={menuRef}
    >
      <Icon customIcon={user?.avatar} handleClick={handleClick} />
      <StyledUserMenu $open={isOpen}>
        <ul>
          <li>
            <Link to={`/users/${user.uuid}`} onClick={handleClick}>
              <FontAwesomeIcon icon={['fas', 'user']} />
              My profile
            </Link>
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
