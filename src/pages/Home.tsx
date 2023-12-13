import { UserTypes } from '../__mock__/mockUsers.ts';
import { FC } from 'react';
import P from '../components/Atoms/Paragraph/P.tsx';
import { mockPosts } from '../__mock__/mockPosts.ts';
import { mockComments } from '../__mock__/mockComments.ts';
import InLink from '../components/Atoms/InLink/InLink.tsx';
import Button from '../components/Atoms/Button/Button.tsx';
import Wrapper from '../components/Organisms/Wrapper/Wrapper.tsx';
import Heading from '../components/Atoms/Heading/Heading.tsx';

interface HomeProps {
  user: UserTypes;
}

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
        <section>
          <Heading tag="h4" size="lm">
            Last article:
          </Heading>
          <P>
            <InLink
              target={`post/id=${latestPost.id}`}
              name={latestPost.title}
            />{' '}
            by {latestPost.author.username} ({articlePublicationDate})
          </P>
          <Heading tag="h4" size="lm">
            Last comment:
          </Heading>
          <P>
            {latestComment.user.username}
            at{' '}
            <InLink
              target={`post/id=${latestPost.id}`}
              name={latestPost.title}
            />{' '}
            ({commentPublicationDate})
          </P>
          <Heading tag="h4" size="lm">
            Most liked article:
          </Heading>
          <P>
            <InLink
              target={`post/id=${mostLikedPost.id}`}
              name={mostLikedPost.title}
            />{' '}
            ({mostLikedPost.likes} likes)
          </P>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Button>Edit post</Button>
          <Button>Create post</Button>
        </section>
      </Wrapper>
    </main>
  );
};

export default Home;
