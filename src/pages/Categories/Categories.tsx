import { Main } from '../../components/Organisms/Main/Main.styles';
import Heading from '../../components/Atoms/Heading/Heading';
import {
  clearSort,
  ISortTypes,
  RootState,
  useGetCategoriesQuery,
} from '../../store';
import TableWrapper from '../../components/Organisms/TableComponents/TableWrapper/TableWrapper';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ITableHeaders } from '../../types/dataTypes.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { FormButton } from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ICategoryData } from '../../types/categoryTypes.ts';

const CategoriesView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sort = useSelector<RootState>((state) => state.sort);
  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery();
  const height = useMinHeight();
  const selectedCategories = useSelector<RootState>(
    (state) => state.selectedCategories,
  );

  const [sortedCategories, setSortedCategories] = useState<ICategoryData[]>([]);

  const categoriesTableHeaders: ITableHeaders[] = [
    {
      value: '',
      sortingKey: null,
    },
    {
      value: t('category.tableHeaders.id'),
      sortingKey: 'id',
    },
    {
      value: t('category.tableHeaders.title'),
      sortingKey: 'title',
    },
    {
      value: t('category.tableHeaders.description'),
      sortingKey: 'description',
    },
    {
      value: '',
      sortingKey: null,
    },
  ];

  useEffect(() => {
    dispatch(clearSort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setSortedCategories(categories.data);
    }
  }, [categories, isSuccess]);

  useEffect(() => {
    if (sortedCategories.length > 0) {
      const sorted = [...sortedCategories];
      sorted.sort((a, b) => {
        if (
          a[(sort as ISortTypes).sortBy as keyof ICategoryData] <
          b[(sort as ISortTypes).sortBy as keyof ICategoryData]
        ) {
          return -1;
        }
        if (
          a[(sort as ISortTypes).sortBy as keyof ICategoryData] >
          b[(sort as ISortTypes).sortBy as keyof ICategoryData]
        ) {
          return 1;
        }

        return 0;
      });

      if ((sort as ISortTypes).order === 'asc') {
        setSortedCategories(sorted);
      } else {
        setSortedCategories(sorted.reverse());
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={height}>
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        {t('category.header')}
      </Heading>
      {selectedCategories && (selectedCategories as ICategoryData[]).length ? (
        <MultiAction counter={(selectedCategories as ICategoryData[]).length} />
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
      <TableWrapper
        content={sortedCategories}
        headers={categoriesTableHeaders}
      />
    </Main>
  );
};

export default CategoriesView;
