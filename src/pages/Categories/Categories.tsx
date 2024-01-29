import { Main } from '../../components/Organisms/Main/Main.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetCategoriesQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import { categoriesTableHeaders } from '../../utils/data';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useSelector } from 'react-redux';
import { CategoriesTypes } from '../../types/dataTypes.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';

const CategoriesView = () => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const height = useMinHeight();
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        Categories
      </Heading>
      {(selectedCategories as CategoriesTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedCategories as CategoriesTypes[]).length}
        />
      ) : null}
      <TableWrapper content={categories} headers={categoriesTableHeaders} />
    </Main>
  );
};

export default CategoriesView;
