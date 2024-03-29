import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
import ArticleForm from '../../components/Organisms/Forms/ArticleForm/ArticleForm';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { Main } from '../../components/Organisms/Main/Main.styles';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';
import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx';
import { IArticleData, IArticlesDataTypes } from '../../types/articleTypes.ts';
import { IStrapiUser } from '../../types/userTypes.ts';

const Article = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: articles, isLoading } = useGetArticlesQuery();
  const height = useMinHeight();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentArticle, setCurrentArticle] = useState<IArticleData | null>();

  useEffect(() => {
    if (articles && (articles as IArticlesDataTypes).data.length > 0) {
      setCurrentArticle(
        (articles as IArticlesDataTypes).data.find(
          (article) => article.id === Number(id),
        ),
      );
    }
  }, [articles, id]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <section>
        <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
          {currentArticle
            ? currentArticle.attributes.title
            : t('article.newArticle')}
        </Heading>
        {!currentArticle ||
        (currentUser as IStrapiUser).uuid ===
          currentArticle.attributes.author.data?.attributes.uuid ||
        (currentUser as IStrapiUser).role.type === 'administrator' ||
        (currentUser as IStrapiUser).role.type === 'redactor' ? (
          <ArticleForm />
        ) : (
          <UnauthorisedView />
        )}
      </section>
    </Main>
  );
};

export default Article;
