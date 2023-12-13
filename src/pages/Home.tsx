import { UserTypes } from '../__mock__/mockUsers.ts';
import { FC } from 'react';
import P from '../components/Atoms/Paragraph/P.tsx';
import { mockPosts, PostTypes } from '../__mock__/mockPosts.ts';
import { CommentTypes, mockComments } from '../__mock__/mockComments.ts';
import InLink from '../components/Atoms/InLink/InLink.tsx';
import Button from '../components/Atoms/Button/Button.tsx';
import Wrapper from '../components/Organisms/Wrapper/Wrapper.tsx';
import Heading from '../components/Atoms/Heading/Heading.tsx';
import { getLatest } from '../utils/methods/getLatest.ts';
import { faker } from '@faker-js/faker';

interface HomeProps {
  user: UserTypes;
}

const Home: FC<HomeProps> = ({ user }) => {
  //mock state
  const publishedPosts = mockPosts.filter((post) => post.publishedAt !== null);
  const allComments = mockComments;
  const randomPost =
    publishedPosts[
      faker.number.int({ min: 0, max: publishedPosts.length - 1 })
    ];
  const mostLikedPost = publishedPosts.sort((a, b) => b.likes - a.likes)[0];
  const latestPost = getLatest(publishedPosts);
  const latestComment = getLatest(allComments);

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
              target={`post/id=${latestPost.latest.id}`}
              name={(latestPost.latest as PostTypes).title}
            />{' '}
            by {(latestPost.latest as PostTypes).author.username} (
            {latestPost.publishedDate})
          </P>
          <Heading tag="h4" size="lm">
            Last comment:
          </Heading>
          <P>
            {(latestComment.latest as CommentTypes).user.username}
            at{' '}
            <InLink
              target={`post/id=${randomPost.id}`}
              name={randomPost.title}
            />{' '}
            ({latestComment.publishedDate})
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
