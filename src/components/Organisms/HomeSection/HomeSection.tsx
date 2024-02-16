import { useEffect, useState } from 'react';
import Heading from '../../Atoms/Heading/Heading';
import InLink from '../../Atoms/InLink/InLink';
import { Loading } from '../../Atoms/Loading/Loading.styles';
import P from '../../Atoms/Paragraph/P';
import { ILatestTypes, getLatest } from '../../../utils/methods/getLatest';
import { useGetArticlesQuery, useGetCommentsQuery } from '../../../store';
import { useTranslation } from 'react-i18next';
import { IArticleData } from '../../../types/articleTypes.ts';
import { ICommentData } from '../../../types/commentTypes.ts';

const HomeSection = () => {
  const { t } = useTranslation();
  const { data: articles, isLoading: loadingArticles } = useGetArticlesQuery();
  const { data: comments, isLoading: loadingComments } = useGetCommentsQuery();

  const [publishedArticles, setPublishedArticles] = useState<IArticleData[]>(
    [],
  );
  const [latestArticle, setLatestArticle] = useState<ILatestTypes>({
    publishedDate: null,
  });
  const [latestComment, setLatestComment] = useState<ILatestTypes>({
    publishedDate: null,
  });
  const [mostLikedArticle, setMostLikedArticle] =
    useState<IArticleData | null>();

  useEffect(() => {
    if (articles && articles.data.length > 0) {
      setPublishedArticles(
        articles.data.filter(
          (article) => article.attributes.publishedAt !== null,
        ),
      );
    }
  }, [articles]);

  useEffect(() => {
    if (comments && comments.data.length > 0) {
      setLatestComment(getLatest(comments.data));
    }
  }, [comments]);

  useEffect(() => {
    if (publishedArticles.length > 0) {
      setLatestArticle(getLatest(publishedArticles));
      setMostLikedArticle(
        publishedArticles.sort(
          (a, b) => b.attributes.likes - a.attributes.likes,
        )[0],
      );
    }
  }, [publishedArticles]);

  if (loadingArticles || loadingComments) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <section>
      <div style={{ margin: '2rem 0' }}>
        <Heading tag="h4" size="lm" padding="0" margin="0">
          {t('home.lastArticle')}
        </Heading>
        {latestArticle.latest ? (
          <>
            <P>
              <InLink
                target={`articles/${latestArticle.latest.id}`}
                name={(latestArticle.latest as IArticleData).attributes.title}
              />{' '}
              {t('home.lastArticleDetails', {
                username: (latestArticle.latest as IArticleData).attributes
                  .author.data.attributes.username,
              })}{' '}
              ({latestArticle.publishedDate})
            </P>
          </>
        ) : (
          <P>No articles found</P>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <Heading tag="h4" size="lm" padding="0" margin="0">
          {t('home.lastComment')}
        </Heading>
        {latestComment.latest ? (
          <>
            <P>
              {t('home.lastCommentDetails', {
                username: (latestComment.latest as ICommentData).attributes
                  .author.data.attributes.username,
              })}{' '}
              <InLink
                target={`articles/${
                  (latestComment.latest as ICommentData).attributes.article.data
                    .id
                }`}
                name={
                  (latestComment.latest as ICommentData).attributes.article.data
                    .attributes.title
                }
              />{' '}
              ({latestComment.publishedDate})
            </P>
          </>
        ) : (
          <P>No comments found</P>
        )}
      </div>
      <div style={{ margin: '2rem 0' }}>
        <Heading tag="h4" size="lm" padding="0" margin="0">
          {t('home.mostLiked')}
        </Heading>
        {latestArticle.latest ? (
          <>
            <P>
              {mostLikedArticle ? (
                <>
                  <InLink
                    target={`articles/${mostLikedArticle.id}`}
                    name={mostLikedArticle.attributes.title}
                  />{' '}
                  ({mostLikedArticle.attributes.likes} likes)
                </>
              ) : null}
            </P>
          </>
        ) : (
          <P>No articles found</P>
        )}
      </div>
    </section>
  );
};

export default HomeSection;
