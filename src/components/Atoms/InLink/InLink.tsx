import { FC, ReactNode } from 'react';
import { StyledInLink } from './InLink.styles.ts';

interface InternalLinkProps {
  target: string;
  name: string | ReactNode;
  onClick?: () => void;
}
const InLink: FC<InternalLinkProps> = ({ target, name, onClick }) => {
  const isString = typeof name === 'string';

  return (
    <StyledInLink to={target} onClick={onClick} $string={isString}>
      {name}
    </StyledInLink>
  );
};

export default InLink;
