import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store/index.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { ArticleDataTypes } from '../../types/dataTypes.ts';
import TableWrapper from '../../components/Organisms/TableWrapper/TableWrapper.tsx';

const Articles = () => {
  const { data: articles = [] } = useGetArticlesQuery();

  const selectedArticles = useSelector<RootState>((state) => state.selected);

  const [wrapperHeight, setWrapperHeight] = useState(0);

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
      <TableWrapper articles={articles} />
    </main>
  );
};

export default Articles;
