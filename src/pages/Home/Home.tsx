import { FC } from 'react';
import Button from '../../components/Atoms/Button/Button.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { UserTypes } from '../../types/dataTypes.ts';
import { useNavigate } from 'react-router';
import HomeSection from '../../components/Organisms/HomeSection/HomeSection.tsx';

interface HomeProps {
  user: UserTypes;
}

const Home: FC<HomeProps> = ({ user }) => {
  const navigation = useNavigate();

  const handleClickEdit = () => {
    navigation('/articles');
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
        You are logged in as {user.role.name}
      </Heading>
      <Wrapper justify="space-evenly" align="center">
        <HomeSection />
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Button handleClick={handleClickEdit}>Edit article</Button>
          <Button>Create article</Button>
        </section>
      </Wrapper>
    </main>
  );
};

export default Home;
