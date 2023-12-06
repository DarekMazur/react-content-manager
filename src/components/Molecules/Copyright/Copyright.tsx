import Link from '../../Atoms/Link/Link.tsx';
import { StyledCopyright } from './Copyright.styles.ts';
import { data } from '../../../utils/data.ts';

const Copyright = () => {
  return (
    <StyledCopyright>
      2023 &copy; <Link url={data.authorUrl} name={data.authorName} />
    </StyledCopyright>
  );
};

export default Copyright;
