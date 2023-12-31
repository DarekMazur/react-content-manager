import { StyledMenuList } from './MenuList.styles.ts';
import MenuListItem from '../../Atoms/MenuListItem/MenuListItem.tsx';

const MenuList = () => {
  return (
    <nav>
      <StyledMenuList>
        <MenuListItem target="/">Dashboard</MenuListItem>
        <MenuListItem target="/articles">Articles</MenuListItem>
        <MenuListItem target="/comments">Comments</MenuListItem>
        <MenuListItem target="/users">Users</MenuListItem>
        <MenuListItem target="/gallery">Gallery</MenuListItem>
      </StyledMenuList>
    </nav>
  );
};

export default MenuList;
