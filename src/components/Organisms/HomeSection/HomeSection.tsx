import { useEffect, useState } from 'react';
import { ArticleDataTypes, CommentTypes } from '../../../types/dataTypes';
import Heading from '../../Atoms/Heading/Heading';
import InLink from '../../Atoms/InLink/InLink';
import { Loading } from '../../Atoms/Loading/Loading.styles';
import P from '../../Atoms/Paragraph/P';
import { LatestTypes, getLatest } from '../../../utils/methods/getLatest';
import { useGetArticlesQuery, useGetCommentsQuery } from '../../../store';

const HomeSection = () => {
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
    useState<ArticleDataTypes | null>();

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
            by {(latestArticle.latest as ArticleDataTypes).author.username} (
            {latestArticle.publishedDate})
          </P>
          <Heading tag="h4" size="lm">
            Last comment:
          </Heading>
          <P>
            {(latestComment.latest as CommentTypes).author?.username}
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
            {mostLikedArticle ? (
              <>
                <InLink
                  target={`articles/${mostLikedArticle.id}`}
                  name={mostLikedArticle.title}
                />{' '}
                ({mostLikedArticle.likes} likes)
              </>
            ) : null}
          </P>
        </section>
      ) : null}
    </>
  );
};

export default HomeSection;
