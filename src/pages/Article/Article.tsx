import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { ArticleDataTypes } from '../../types/dataTypes';
import { getDate } from '../../utils/methods/getDate';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [], isLoading } = useGetArticlesQuery();

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  useEffect(() => {
    setCurrentArticle(articles.find((article) => article.id === Number(id))!);
  }, [articles, id]);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      {currentArticle ? (
        <>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            {currentArticle.title}
          </Heading>
          <section>
            <img src={currentArticle.cover} alt="" />
            <p>by {currentArticle.author.username}</p>
            <p>category: {currentArticle.categories}</p>
            <p>tag: {currentArticle.tags.map((tag) => `#${tag} `)}</p>
            <p>
              {currentArticle.publishedAt
                ? `published at ${getDate(currentArticle.publishedAt)}`
                : 'Draft'}
            </p>
            <p>{currentArticle.description}</p>
            <div>{currentArticle.body}</div>
          </section>
        </>
      ) : null}
    </main>
  );
};

export default Article;
