import { StyledNoContent } from './NoContent.styles.ts';
import empty from '../../../assets/empty.svg';
import Heading from '../../Atoms/Heading/Heading.tsx';

const NoContent = () => {
  return (
    <StyledNoContent>
      <Heading tag={'h3'}>Nothing here yet</Heading>
      <img src={empty} alt="" />
      <p>Create first entry</p>
    </StyledNoContent>
  );
};

export default NoContent;
