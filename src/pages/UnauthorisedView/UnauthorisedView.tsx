import Heading from '../../components/Atoms/Heading/Heading.tsx';
import P from '../../components/Atoms/Paragraph/P.tsx';

const UnauthorisedView = () => {
  return (
    <div>
      <Heading tag={'h3'}>You are not authorised</Heading>
      <P>You can't view this page</P>
    </div>
  );
};

export default UnauthorisedView;
