import { FC, useEffect, useState } from 'react';
import { theme } from '../../../utils/themes/theme.ts';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import { data } from '../../../utils/data.ts';
import { StyledUnauthorised } from './Unauthorised.styles.ts';
import { getFooterHeight } from '../../../utils/methods/getFooterHeight.ts';
import InLink from '../../Atoms/InLink/InLink.tsx';
import LockIcon from '../../Atoms/LockIcon/LockIcon.tsx';

interface AuthProps {
  handleMockLogin: () => void;
}

const Unauthorised: FC<AuthProps> = ({ handleMockLogin }) => {
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    setWrapperHeight(getFooterHeight());
  }, []);

  return (
    <StyledUnauthorised $height={wrapperHeight}>
      <LockIcon />
      <p style={{ fontSize: theme.fontSize.xl }}>
        You need to{' '}
        <InLink target="/" name="log in" onClick={handleMockLogin} /> first
      </p>
      <p>or</p>
      <p>
        go back to <ExtLink url={data.blogUrl} name="blog" />
      </p>
    </StyledUnauthorised>
  );
};

export default Unauthorised;
