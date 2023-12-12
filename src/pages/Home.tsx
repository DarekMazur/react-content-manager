import { UserTypes } from '../__mock__/mockUsers.ts';
import { FC } from 'react';
import P from '../components/Atoms/Paragraph/P.tsx';
import { mockPosts } from '../__mock__/mockPosts.ts';
import { mockComments } from '../__mock__/mockComments.ts';

interface HomeProps {
  user: UserTypes;
}

const Home: FC<HomeProps> = (props) => {
  const { user } = props;
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
          justifyContent: 'center',
          alignItems: 'center',
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
            {latestComment.user.username} at {latestPost.title} (
            {commentPublicationDate})
          </P>
          <h4>Most liked article:</h4>
          <P>
            {mostLikedPost.title} ({mostLikedPost.likes} likes)
          </P>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <button>Edit post</button>
          <button>Create post</button>
        </section>
      </div>
    </main>
  );
};

export default Home;
