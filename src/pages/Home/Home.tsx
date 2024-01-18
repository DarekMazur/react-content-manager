import { FC, useEffect, useState } from 'react';
import P from '../../components/Atoms/Paragraph/P.tsx';
import InLink from '../../components/Atoms/InLink/InLink.tsx';
import Button from '../../components/Atoms/Button/Button.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { LatestTypes, getLatest } from '../../utils/methods/getLatest.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import {
  ArticleDataTypes,
  CommentTypes,
  UserTypes,
} from '../../types/dataTypes.ts';
import { useGetArticlesQuery, useGetCommentsQuery } from '../../store/index.ts';

interface HomeProps {
  user: UserTypes;
}

const Home: FC<HomeProps> = ({ user }) => {
  const initialArticle = {
    id: 0,
    title: '',
    cover: '',
    isSticky: false,
    description: '',
    body: '',
    uuid: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: null,
    likes: 0,
    categories: '',
    tags: [],
    author: {
      uuid: '',
      username: '',
      email: '',
      avatar: '',
      role: {
        id: 0,
        name: '',
        description: '',
        type: '',
      },
    },
    comments: null,
  };
  const { data: articles = [], isLoading: loadingArticles } =
    useGetArticlesQuery();
  const { data: comments = [], isLoading: loadingComments } =
    useGetCommentsQuery();

  const [publishedArticles, setPublishedArticles] = useState<
    ArticleDataTypes[]
  >([]);
  const [latestArticle, setLatestArticle] = useState<LatestTypes>({
    publishedDate: null,
  });
  const [latestComment, setLatestComment] = useState<LatestTypes>({
    publishedDate: null,
  });
  const [mostLikedArticle, setMostLikedArticle] =
    useState<ArticleDataTypes>(initialArticle);

  useEffect(() => {
    if (articles.length > 0) {
      setPublishedArticles(
        articles.filter((article) => article.publishedAt !== null),
      );
    }
  }, [articles]);

  useEffect(() => {
    if (comments.length > 0) {
      setLatestComment(getLatest(comments));
    }
  }, [comments]);

  useEffect(() => {
    if (publishedArticles.length > 0) {
      setLatestArticle(getLatest(publishedArticles));
      setMostLikedArticle(
        publishedArticles.sort((a, b) => b.likes - a.likes)[0],
      );
    }
  }, [publishedArticles]);

  if (loadingArticles || loadingComments) {
    return <Loading>Loading...</Loading>;
  }

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
        <>
          {latestArticle.latest && latestComment.latest ? (
            <section>
              <Heading tag="h4" size="lm">
                Last article:
              </Heading>
              <P>
                <InLink
                  target={`articles/${latestArticle.latest.id}`}
                  name={(latestArticle.latest as ArticleDataTypes).title}
                />{' '}
                by {(latestArticle.latest as ArticleDataTypes).author.username}{' '}
                ({latestArticle.publishedDate})
              </P>
              <Heading tag="h4" size="lm">
                Last comment:
              </Heading>
              <P>
                {(latestComment.latest as CommentTypes).user?.username}
                at{' '}
                <InLink
                  target={`articles/${
                    (latestComment.latest as CommentTypes).article.id
                  }`}
                  name={(latestComment.latest as CommentTypes).article.title}
                />{' '}
                ({latestComment.publishedDate})
              </P>
              <Heading tag="h4" size="lm">
                Most liked article:
              </Heading>
              <P>
                <InLink
                  target={`articles/${mostLikedArticle.id}`}
                  name={mostLikedArticle.title}
                />{' '}
                ({mostLikedArticle.likes} likes)
              </P>
            </section>
          ) : null}
        </>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Button>Edit article</Button>
          <Button>Create article</Button>
        </section>
      </Wrapper>
    </main>
  );
};

export default Home;
