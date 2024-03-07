import Heading from '../../components/Atoms/Heading/Heading.tsx';
import P from '../../components/Atoms/Paragraph/P.tsx';
import { useTranslation } from 'react-i18next';
import { StyledUnauthorizedView } from './UnauthirisedView.styles.ts';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormButton } from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';

const UnauthorisedView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser([]));
    localStorage.removeItem('jwt');
    localStorage.removeItem('uuid');
    localStorage.removeItem('username');
    window.location.replace(import.meta.env.VITE_AUTH0_LOGOUT_URL);
  };

  return (
    <StyledUnauthorizedView>
      <Heading tag={'h3'} size={'l'}>{t('unauthorised.header')}</Heading>
      <P>{t('unauthorised.message')}</P>
      <FormButton $type="button" type="button" onClick={handleLogout}>
        <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} />{' '}
        {t('navigation.userArea.logout')}
      </FormButton>
    </StyledUnauthorizedView>
  );
};

export default UnauthorisedView;
