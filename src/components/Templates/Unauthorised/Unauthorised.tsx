import { FC, useEffect, useState } from 'react';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import { data } from '../../../utils/data.ts';
import { StyledUnauthorised } from './Unauthorised.styles.ts';
import { getFooterHeight } from '../../../utils/methods/getFooterHeight.ts';
import InLink from '../../Atoms/InLink/InLink.tsx';
import LockIcon from '../../Atoms/LockIcon/LockIcon.tsx';
import P from '../../Atoms/Paragraph/P.tsx';

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
      <P size="xl">
        You need to{' '}
        <InLink target="/" name="log in" onClick={handleMockLogin} /> first
      </P>
      <P>or</P>
      <P>
        go back to <ExtLink url={data.blogUrl} name="blog" />
      </P>
    </StyledUnauthorised>
  );
};

export default Unauthorised;
