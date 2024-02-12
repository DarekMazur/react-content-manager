import { StyledLink } from './ExtLink.styles.ts';

interface ILinkProps {
  url: string;
  name?: string;
  size?: string;
}

const ExtLink = (props: ILinkProps) => {
  const { url, name, size } = props;
  return (
    <StyledLink href={url} size={size} target="_blank">
      {name}
    </StyledLink>
  );
};

export default ExtLink;
