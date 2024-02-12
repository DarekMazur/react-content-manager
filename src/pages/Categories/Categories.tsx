import { Main } from '../../components/Organisms/Main/Main.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import { RootState, useGetCategoriesQuery } from '../../store';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useSelector } from 'react-redux';
import { ICategoriesTypes } from '../../types/dataTypes.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { FormButton } from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const CategoriesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const height = useMinHeight();
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );

  const categoriesTableHeaders = [
    '',
    t('category.tableHeaders.id'),
    t('category.tableHeaders.name'),
    t('category.tableHeaders.description'),
    '',
  ];

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('category.header')}
      </Heading>
      {(selectedCategories as ICategoriesTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedCategories as ICategoriesTypes[]).length}
        />
      ) : null}
      <div
        style={{
          width: '95vw',
          margin: '0 auto 0.8rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <FormButton
          $type="submit"
          type="button"
          onClick={() => navigate('/categories/create')}
        >
          <FontAwesomeIcon icon={['fas', 'pen']} /> {t('category.newCategory')}
        </FormButton>
      </div>
      <TableWrapper content={categories} headers={categoriesTableHeaders} />
    </Main>
  );
};

export default CategoriesView;
