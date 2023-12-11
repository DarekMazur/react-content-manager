import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../../utils/themes/theme.ts';
import { Link } from 'react-router-dom';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import { data } from '../../../utils/data.ts';
import { StyledUnauthorised } from './Unauthorised.styles.ts';
import { getFooterHeight } from '../../../utils/methods/getFooterHeight.ts';

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
      <FontAwesomeIcon
        icon={['fas', 'lock']}
        style={{ fontSize: '14rem', color: theme.colors.darkBlue }}
      />
      <p style={{ fontSize: theme.fontSize.xl }}>
        You need to{' '}
        <Link
          style={{
            color: theme.colors.blue,
            textDecoration: 'none',
          }}
          onClick={handleMockLogin}
          to="/"
        >
          log in
        </Link>{' '}
        first
      </p>
      <p>or</p>
      <p>
        go back to <ExtLink url={data.blogUrl} name="blog" />
      </p>
    </StyledUnauthorised>
  );
};

export default Unauthorised;
