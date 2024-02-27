import { FC } from 'react';
import Button from '../../components/Atoms/Button/Button.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useNavigate } from 'react-router';
import HomeSection from '../../components/Organisms/HomeSection/HomeSection.tsx';
import { useTranslation } from 'react-i18next';
import { IStrapiUser } from '../../types/userTypes.ts';
import { setUser } from '../../store';
import { useDispatch } from 'react-redux';

interface IHomeProps {
  user: IStrapiUser;
}

const Home: FC<IHomeProps> = ({ user }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const navigation = useNavigate();

  const handleClickEdit = () => {
    navigation('/articles');
  };

  const handleClickCreate = () => {
    navigation('/articles/create');
  };

  return (
    <main>
      <Heading
        tag="h3"
        size="l"
        align="center"
        margin="2rem 0"
        padding="1rem 0"
      >
        {t('home.header', { role: user.role.name })}
      </Heading>
      <Wrapper justify="space-evenly" align="center">
        <HomeSection />
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Button handleClick={handleClickEdit}>{t('home.editButton')}</Button>
          <Button handleClick={handleClickCreate}>
            {t('home.createButton')}
          </Button>
        </section>
      </Wrapper>
    </main>
  );
};

export default Home;
