import { Bg404, Styled404, Wrapper404 } from './404.styles.ts';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Styled404>
      <div>
        <Bg404>
          <h1>404</h1>
        </Bg404>
        <Wrapper404>
          <h3 className="h2">Look like you're lost</h3>
          <p>the page you are looking for not available!</p>
          <Link to={'/'}>Go to Home</Link>
        </Wrapper404>
      </div>
    </Styled404>
  );
};

export default Page404;
