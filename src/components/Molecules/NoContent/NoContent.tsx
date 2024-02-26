import { StyledNoContent } from './NoContent.styles.ts';
import empty from '../../../assets/empty.svg';
import Heading from '../../Atoms/Heading/Heading.tsx';
import { useTranslation } from 'react-i18next';
import InLink from '../../Atoms/InLink/InLink.tsx';

const NoContent = ({ tag }: { tag: string }) => {
  const { t } = useTranslation();

  return (
    <StyledNoContent>
      <Heading tag={'h3'}>{t('noContent.header')}</Heading>
      <img src={empty} alt="" />
      {tag === 'comments' || tag === 'users' ? null : (
        <InLink target={`/${tag}/create`} name={t('noContent.create')} />
      )}
    </StyledNoContent>
  );
};

export default NoContent;
