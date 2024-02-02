import { StyledMenuList } from './MenuList.styles.ts';
import MenuListItem from '../../Atoms/MenuListItem/MenuListItem.tsx';
import { useTranslation } from 'react-i18next';

const MenuList = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <StyledMenuList>
        <MenuListItem target="/">{t('navigation.menu.home')}</MenuListItem>
        <MenuListItem target="/articles">
          {t('navigation.menu.articles')}
        </MenuListItem>
        <MenuListItem target="/comments">
          {t('navigation.menu.comments')}
        </MenuListItem>
        <MenuListItem target="/categories">
          {t('navigation.menu.categories')}
        </MenuListItem>
        <MenuListItem target="/users">
          {t('navigation.menu.users')}
        </MenuListItem>
      </StyledMenuList>
    </nav>
  );
};

export default MenuList;
