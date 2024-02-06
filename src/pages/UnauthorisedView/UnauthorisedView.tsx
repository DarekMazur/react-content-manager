import Heading from '../../components/Atoms/Heading/Heading.tsx';
import P from '../../components/Atoms/Paragraph/P.tsx';
import { useTranslation } from 'react-i18next';
import { StyledUnauthorizedView } from './UnauthirisedView.styles.ts';

const UnauthorisedView = () => {
  const { t } = useTranslation();
  return (
    <StyledUnauthorizedView>
      <Heading tag={'h3'}>{t('unauthorised.header')}</Heading>
      <P>{t('unauthorised.message')}</P>
    </StyledUnauthorizedView>
  );
};

export default UnauthorisedView;
