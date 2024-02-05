import Heading from '../../components/Atoms/Heading/Heading.tsx';
import P from '../../components/Atoms/Paragraph/P.tsx';

const UnauthorisedView = () => {
  return (
    <main>
      <div>
        <Heading tag={'h2'}>You are not authorised</Heading>
        <P>You can't view this page</P>
      </div>
    </main>
  );
};

export default UnauthorisedView;
