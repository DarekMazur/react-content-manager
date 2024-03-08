import { ReactNode } from 'react';
import { StyledMenuListItemLink } from './MenuListItem.styles.ts';

interface IMenuListItemProps {
  target: string;
  children: ReactNode;
}
const MenuListItem = ({ children, target }: IMenuListItemProps) => {
  return (
    <StyledMenuListItemLink to={target}>
      <li>{children}</li>
    </StyledMenuListItemLink>
  );
};

export default MenuListItem;
