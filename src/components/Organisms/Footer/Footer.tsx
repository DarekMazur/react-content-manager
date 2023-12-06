import { Footer } from './Footer.styles.ts';
import Link from '../../Atoms/Link/Link.tsx';
import Copyright from '../../Molecules/Copyright/Copyright.tsx';
import { data } from '../../../utils/data.ts';

const FooterWrapper = () => {
  return (
    <Footer>
      <p>RCM4Strapi</p>
      <Link url={data.blogUrl} name={data.blogName} size="s" />
      <Copyright />
    </Footer>
  );
};

export default FooterWrapper;
