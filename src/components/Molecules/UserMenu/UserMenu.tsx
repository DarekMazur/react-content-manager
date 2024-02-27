import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledUserMenu } from './UserMenu.styles';
import { setUser } from '../../../store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from '../../Atoms/Icon/Icon';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import flagGb from '../../../assets/icons/gb.svg';
import flagPl from '../../../assets/icons/pl.svg';
import LanguageButton from '../../Atoms/LanguageButton/LanguageButton.tsx';
import { IStrapiUser } from '../../../types/userTypes.ts';

const UserMenu = ({
  user,
  isOpen,
  handleClick,
}: {
  user: IStrapiUser;
  isOpen?: boolean;
  handleClick: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const langs = {
    en: { nativeFlag: flagGb, nativeName: 'English' },
    pl: { nativeFlag: flagPl, nativeName: 'Polish' },
  };

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

  const handleLogout = () => {
    dispatch(setUser([]));
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    window.location.replace(
      `https://${import.meta.env.VITE_AUTH_DOMAIN}/v2/logout?returnTo=${
        window.location.origin
      }`,
    );
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
      <Icon
        customIcon={
          user?.avatar ? user.avatar.formats.thumbnail.url : undefined
        }
        handleClick={handleClick}
      />
      <StyledUserMenu $open={isOpen}>
        <ul>
          <li>
            <Link to={`/users/${user.uuid}`} onClick={handleClick}>
              <FontAwesomeIcon icon={['fas', 'user']} />
              {t('navigation.userArea.myProfile')}
            </Link>
          </li>
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} />
            {t('navigation.userArea.logout')}
          </li>
          <li>
            {Object.keys(langs).map((lng) => (
              <LanguageButton
                key={lng}
                lang={lng}
                src={langs[lng as keyof typeof langs].nativeFlag}
                alt={langs[lng as keyof typeof langs].nativeName}
              />
            ))}
          </li>
        </ul>
      </StyledUserMenu>
    </div>
  );
};

export default UserMenu;
