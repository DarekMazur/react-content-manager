import { Footer } from './Footer.styles.ts';
import ExtLink from '../../Atoms/ExtLink/ExtLink.tsx';
import Copyright from '../../Molecules/Copyright/Copyright.tsx';
import { data } from '../../../utils/data.ts';

const FooterWrapper = () => {
  return (
    <Footer>
      <p>RCM4Strapi</p>
      <ExtLink url={data.blogUrl} name={data.blogName} size="s" />
      <Copyright />
    </Footer>
  );
};

export default FooterWrapper;
