import { ElementType, FC, HTMLAttributes, ReactNode } from 'react';
import { StyledHeading } from './Heading.styles.ts';

interface IHeadingProps extends HTMLAttributes<Element> {
  tag: ElementType;
  children: ReactNode;
  align?: string;
  size?: string;
  padding?: string;
  margin?: string;
}

const Heading: FC<IHeadingProps> = ({
  children,
  tag,
  align,
  size,
  padding,
  margin,
}) => {
  return (
    <StyledHeading
      as={
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(String(tag)) ? tag : 'h3'
      }
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
