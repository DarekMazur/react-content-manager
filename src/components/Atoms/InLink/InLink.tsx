import { FC } from 'react';
import { StyledInLink } from './InLink.styles.ts';

interface InternalLinkProps {
  target: string;
  name: string;
  onClick?: () => void;
}
const InLink: FC<InternalLinkProps> = ({ target, name, onClick }) => {
  return (
    <StyledInLink to={target} onClick={onClick}>
      {name}
    </StyledInLink>
  );
};

export default InLink;
