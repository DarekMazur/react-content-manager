import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { ArticleDataTypes, UserTypes } from '../../types/dataTypes';
import ArticleForm from '../../components/Organisms/Forms/ArticleForm/ArticleForm';
import { useSelector } from 'react-redux';
import P from '../../components/Atoms/Paragraph/P';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  useEffect(() => {
    if (articles && articles.length > 0) {
      setCurrentArticle(articles.find((article) => article.id === Number(id)));
    }
  }, [articles, id]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <section>
        <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
          {currentArticle ? currentArticle.title : 'New article'}
        </Heading>
        {!currentArticle ||
        (currentUser as UserTypes).uuid === currentArticle.author.uuid ||
        (currentUser as UserTypes).role.type === 'admin' ||
        (currentUser as UserTypes).role.type === 'redactor' ? (
          <ArticleForm />
        ) : (
          <P>You're not authorised</P>
        )}
      </section>
    </Main>
  );
};

export default Article;
