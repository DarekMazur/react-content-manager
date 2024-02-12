import { StyledMenuList } from './MenuList.styles.ts';
import MenuListItem from '../../Atoms/MenuListItem/MenuListItem.tsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IUserTypes } from '../../../types/dataTypes.ts';

const MenuList = () => {
  const { t } = useTranslation();
  const currentUser = useSelector<RootState>((state) => state.user);

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
        {(currentUser as IUserTypes).role.type === 'admin' ||
        (currentUser as IUserTypes).role.type === 'redactor' ? (
          <MenuListItem target="/users">
            {t('navigation.menu.users')}
          </MenuListItem>
        ) : null}
      </StyledMenuList>
    </nav>
  );
};

export default MenuList;
