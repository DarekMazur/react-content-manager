import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { ArticleDataTypes, UserTypes } from '../../types/dataTypes';
import ArticleForm from '../../components/Organisms/ArticleForm/ArticleForm';
import { useSelector } from 'react-redux';
import P from '../../components/Atoms/Paragraph/P';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

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
    return <Loading>Loading...</Loading>;
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
          {(currentUser as UserTypes).uuid === currentArticle.author.uuid ||
          (currentUser as UserTypes).role.type === 'admin' ||
          (currentUser as UserTypes).role.type === 'redactor' ? (
            <ArticleForm />
          ) : (
            <P>You're not authorised</P>
          )}
        </section>
      ) : null}
    </main>
  );
};

export default Article;