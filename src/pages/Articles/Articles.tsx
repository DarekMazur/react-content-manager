import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store/index.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { ArticleDataTypes, UserTypes } from '../../types/dataTypes.ts';
import TableWrapper from '../../components/Organisms/TableWrapper/TableWrapper.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';

const Articles = () => {
  const { data: articles = [] } = useGetArticlesQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [availableArticles, setAvailableArticles] = useState<
    ArticleDataTypes[]
  >([]);

  useEffect(() => {
    if ((currentUser as UserTypes).role.id === 3) {
      setAvailableArticles(
        articles.filter(
          (article) => article.author.uuid === (currentUser as UserTypes).uuid,
        ),
      );
    } else {
      setAvailableArticles(articles);
    }
  }, [articles, currentUser]);

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
        Articles
      </Heading>
      {(selectedArticles as ArticleDataTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedArticles as ArticleDataTypes[]).length}
        />
      ) : null}
      <TableWrapper
        content={availableArticles}
        headers={articlesTableHeaders}
      />
    </main>
  );
};

export default Articles;
