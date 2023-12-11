import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../../utils/themes/theme.ts';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import { data } from '../../../utils/data.ts';
import { StyledUnauthorised } from './Unauthorised.styles.ts';
import { getFooterHeight } from '../../../utils/methods/getFooterHeight.ts';
import styled from 'styled-components';
import InLink from '../../Atoms/InLink/InLink.tsx';

interface AuthProps {
  handleMockLogin: () => void;
}

const StyledLockIcon = styled.svg`
  font-size: 14rem;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

const LockIcon = () => {
  return <StyledLockIcon as={FontAwesomeIcon} icon={['fas', 'lock']} />;
};

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
