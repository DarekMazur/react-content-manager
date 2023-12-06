import { StyledLink } from './Link.styles.ts';

interface LinkProps {
  url: string;
  name: string;
  size?: string;
}

const Link = (props: LinkProps) => {
  const { url, name, size } = props;
  return (
    <StyledLink href={url} size={size} target="_blank">
      {name}
    </StyledLink>
  );
};

export default Link;
