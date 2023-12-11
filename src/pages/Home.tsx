import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExtLink from '../components/Atoms/ExtLink/ExtLink.tsx';
import { data } from '../utils/data.ts';
import styled from 'styled-components';
import { theme } from '../utils/themes/theme.ts';
import { Link } from 'react-router-dom';

interface HomeProps {
  isAuthorised: boolean;
  handleMockLogin: () => void;
  wrapperHeight: number;
}

interface AuthProps {
  handleMockLogin: () => void;
  wrapperHeight: number;
}

interface StyleProps {
  $height: number;
}

const StyledUnauthorised = styled.main<StyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  min-height: ${({ $height }) => `calc(100vh - ${$height}px)`};
`;

const Unauthorised: FC<AuthProps> = ({ handleMockLogin, wrapperHeight }) => {
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

const Home: FC<HomeProps> = ({
  isAuthorised,
  handleMockLogin,
  wrapperHeight,
}) => {
  return isAuthorised ? (
    <div>
      <p>Dashboard - authorised</p>
    </div>
  ) : (
    <Unauthorised
      handleMockLogin={handleMockLogin}
      wrapperHeight={wrapperHeight}
    />
  );
};

export default Home;
