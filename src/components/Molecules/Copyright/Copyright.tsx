import Link from '../../Atoms/Link/Link.tsx';
import { StyledCopyright } from './Copyright.styles.ts';

const Copyright = () => {
  return (
    <StyledCopyright>
      2023 &copy; <Link url="https://nerdistry.pl" name="Nerdistry" />
    </StyledCopyright>
  );
};

export default Copyright;
