import { UserTypes } from '../__mock__/mockUsers.ts';
import { FC, ReactNode } from 'react';
import P from '../components/Atoms/Paragraph/P.tsx';
import { mockPosts } from '../__mock__/mockPosts.ts';
import { mockComments } from '../__mock__/mockComments.ts';
import styled from 'styled-components';

interface HomeProps {
  user: UserTypes;
}

interface ButtonProps {
  children: ReactNode;
}

const StyledButton = styled.button`
  margin: 1rem;
  width: 25rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.lm};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const Button: FC<ButtonProps> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

const Home: FC<HomeProps> = ({ user }) => {
  const publishedPosts = mockPosts.filter((post) => post.publishedAt !== null);
  const latestPost = publishedPosts.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];
  const latestComment = mockComments.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];
  const articlePublicationDate = `${latestPost.publishedAt?.getDate()}.${latestPost.publishedAt?.getMonth()}.${latestPost.publishedAt?.getFullYear()}, ${latestPost.publishedAt?.getHours()}:${latestPost.publishedAt?.getMinutes()} `;
  const commentPublicationDate = `${latestComment.publishedAt?.getDate()}.${latestComment.publishedAt?.getMonth()}.${latestComment.publishedAt?.getFullYear()}, ${latestComment.publishedAt?.getHours()}:${latestComment.publishedAt?.getMinutes()} `;

  const mostLikedPost = publishedPosts.sort((a, b) => b.likes - a.likes)[0];
  return (
    <main>
      <h3 style={{ textAlign: 'center' }}>
        You are logged in as {user.role.name}
      </h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <section>
          <h4>Last article:</h4>
          <P>
            {latestPost.title} by {latestPost.author.username} (
            {articlePublicationDate})
          </P>
          <h4>Last comment:</h4>
          <P>
            {latestComment.user.username}
            at {latestPost.title} ({commentPublicationDate})
          </P>
          <h4>Most liked article:</h4>
          <P>
            {mostLikedPost.title} ({mostLikedPost.likes} likes)
          </P>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Button>Edit post</Button>
          <Button>Create post</Button>
        </section>
      </div>
    </main>
  );
};

export default Home;
