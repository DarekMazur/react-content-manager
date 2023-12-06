import { Footer } from './Footer.styles.ts';
import styled from 'styled-components';

interface StyledLinkProps {
  size?: string;
}

interface LinkProps {
  url: string;
  name: string;
  size?: string;
}

const blogName: string = 'Leśny Gacek';

const StyledLink = styled.a<StyledLinkProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme, size }) => (size ? theme.fontSize[size] : 'inherit')};
`;

const StyledCopyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Copyright = () => {
  return (
    <StyledCopyright>
      2023 &copy; <Link url="https://nerdistry.pl" name="Nerdistry" />
    </StyledCopyright>
  );
};

const Link = (props: LinkProps) => {
  const { url, name, size } = props;
  return (
    <StyledLink href={url} size={size}>
      {name}
    </StyledLink>
  );
};

const FooterWrapper = () => {
  return (
    <Footer>
      <p>RCM4Strapi</p>
      <Link url="https://lesnygacek.pl" name={blogName} size="s" />
      <Copyright />
    </Footer>
  );
};

export default FooterWrapper;
