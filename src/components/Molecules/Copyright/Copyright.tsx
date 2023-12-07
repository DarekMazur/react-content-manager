import Link from '../../Atoms/Link/Link.tsx';
import { StyledCopyright } from './Copyright.styles.ts';
import { data } from '../../../utils/data.ts';
import { getDate } from '../../../utils/methods/getDate.ts';

const Copyright = () => {
  return (
    <StyledCopyright>
      {getDate()} &copy; <Link url={data.authorUrl} name={data.authorName} />
    </StyledCopyright>
  );
};

export default Copyright;
