import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { ArticleDataTypes } from '../../types/dataTypes';
import ArticleForm from '../../components/Organisms/ArticleForm/ArticleForm';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [], isLoading } = useGetArticlesQuery();

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  useEffect(() => {
    if (articles && articles.length > 0) {
      setCurrentArticle(articles.find((article) => article.id === Number(id)));
    }
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
        <section>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            {currentArticle.title}
          </Heading>
          <ArticleForm />
        </section>
      ) : null}
    </main>
  );
};

export default Article;
