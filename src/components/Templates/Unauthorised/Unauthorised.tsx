import { FC, useEffect, useState } from 'react';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import { data } from '../../../utils/data.ts';
import { StyledUnauthorised } from './Unauthorised.styles.ts';
import { getFooterHeight } from '../../../utils/methods/getFooterHeight.ts';
import InLink from '../../Atoms/InLink/InLink.tsx';
import LockIcon from '../../Atoms/LockIcon/LockIcon.tsx';
import P from '../../Atoms/Paragraph/P.tsx';
import { Trans, useTranslation } from 'react-i18next';

interface AuthProps {
  handleMockLogin?: () => void;
}

const Unauthorised: FC<AuthProps> = ({ handleMockLogin }) => {
  const { t } = useTranslation();
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    setWrapperHeight(getFooterHeight());
  }, []);

  return (
    <StyledUnauthorised $height={wrapperHeight}>
      <LockIcon />
      <P size="xl">
        <Trans
          i18nKey="unauthorised.global.message"
          components={{
            link: <InLink target="/" onClick={handleMockLogin} />,
          }}
        />
      </P>
      <P>{t('unauthorised.global.or')}</P>
      <P>
        <Trans
          i18nKey="unauthorised.global.goBack"
          components={{
            link: <ExtLink url={data.blogUrl} />,
          }}
        />
      </P>
    </StyledUnauthorised>
  );
};

export default Unauthorised;
