import { ReactNode } from 'react';
import { StyledMenuListItemLink } from './MenuListItem.styles.ts';

interface MenuListItemProps {
  target: string;
  children: ReactNode;
}
const MenuListItem = ({ children, target }: MenuListItemProps) => {
  return (
    <StyledMenuListItemLink to={target}>
      <li>{children}</li>
    </StyledMenuListItemLink>
  );
};

export default MenuListItem;
