import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { ArticleDataTypes } from '../../types/dataTypes';
import { getDate } from '../../utils/methods/getDate';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [] } = useGetArticlesQuery();

  const [wrapperHeight, setWrapperHeight] = useState(0);

  const currentArticle: ArticleDataTypes = articles.find(
    (article) => article.id === Number(id),
  )!;

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {currentArticle.title}
      </Heading>
      <section>
        <img src={currentArticle.cover} alt="" />
        <p>by {currentArticle.author.username}</p>
        <p>{currentArticle.categories}</p>
        <p>
          {currentArticle.publishedAt
            ? `published at ${getDate(currentArticle.publishedAt)}`
            : 'Draft'}
        </p>
        <p>{currentArticle.description}</p>
        <div>{currentArticle.body}</div>
      </section>
    </main>
  );
};

export default Article;
