import { useEffect, useState } from 'react';
import { IArticleDataTypes, ICommentTypes } from '../../../types/dataTypes';
import Heading from '../../Atoms/Heading/Heading';
import InLink from '../../Atoms/InLink/InLink';
import { Loading } from '../../Atoms/Loading/Loading.styles';
import P from '../../Atoms/Paragraph/P';
import { LatestTypes, getLatest } from '../../../utils/methods/getLatest';
import { useGetArticlesQuery, useGetCommentsQuery } from '../../../store';
import { useTranslation } from 'react-i18next';

const HomeSection = () => {
  const { t } = useTranslation();
  const { data: articles = [], isLoading: loadingArticles } =
    useGetArticlesQuery();
  const { data: comments = [], isLoading: loadingComments } =
    useGetCommentsQuery();

  const [publishedArticles, setPublishedArticles] = useState<
    IArticleDataTypes[]
  >([]);
  const [latestArticle, setLatestArticle] = useState<LatestTypes>({
    publishedDate: null,
  });
  const [latestComment, setLatestComment] = useState<LatestTypes>({
    publishedDate: null,
  });
  const [mostLikedArticle, setMostLikedArticle] =
    useState<IArticleDataTypes | null>();

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
            {t('home.lastArticle')}
          </Heading>
          <P>
            <InLink
              target={`articles/${latestArticle.latest.id}`}
              name={(latestArticle.latest as IArticleDataTypes).title}
            />{' '}
            {t('home.lastArticleDetails', {
              username: (latestArticle.latest as IArticleDataTypes).author
                .username,
            })}
            ({latestArticle.publishedDate})
          </P>
          <Heading tag="h4" size="lm">
            {t('home.lastComment')}
          </Heading>
          <P>
            {t('home.lastCommentDetails', {
              username: (latestComment.latest as ICommentTypes).author
                ?.username,
            })}{' '}
            <InLink
              target={`articles/${
                (latestComment.latest as ICommentTypes).article.id
              }`}
              name={(latestComment.latest as ICommentTypes).article.title}
            />{' '}
            ({latestComment.publishedDate})
          </P>
          <Heading tag="h4" size="lm">
            {t('home.mostLiked')}
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
