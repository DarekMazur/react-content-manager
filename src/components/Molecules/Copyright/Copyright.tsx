import Link from '../../Atoms/ExtLink/ExtLink.tsx';
import { StyledCopyright } from './Copyright.styles.ts';
import { data } from '../../../utils/data.ts';
import { getYear } from '../../../utils/methods/getYear.ts';

const Copyright = () => {
  return (
    <StyledCopyright role="copyright">
      {getYear()} &copy; <Link url={data.authorUrl} name={data.authorName} />
    </StyledCopyright>
  );
};

export default Copyright;
