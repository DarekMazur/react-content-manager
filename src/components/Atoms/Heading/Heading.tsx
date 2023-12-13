import { ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { StyledHeading } from './Heading.styles.ts';

interface HeadingProps extends HTMLAttributes<Element> {
  tag: ElementType;
  children: ReactNode;
  align?: string;
  size?: string;
  padding?: string;
  margin?: string;
}

const Heading: FC<HeadingProps> = ({
  children,
  tag,
  align,
  size,
  padding,
  margin,
}) => {
  return (
    <StyledHeading
      as={tag}
      $align={align}
      $size={size}
      $padding={padding}
      $margin={margin}
    >
      {children}
    </StyledHeading>
  );
};

export default Heading;
