import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { ICategoriesTypes } from '../../types/dataTypes.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import CategoryForm from '../../components/Organisms/Forms/CategoryForm/CategoryForm.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';

const CategoryView = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const height = useMinHeight();
  const [currentCategory, setCurrentCategory] = useState<
    ICategoriesTypes | undefined
  >(undefined);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories.find((category) => category.uuid === uuid));
    }
  }, [categories, uuid]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <Main $minHeight={height}>
        <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
          {currentCategory
            ? t('category.headerSingular', { title: currentCategory.title })
            : t('category.newCategory')}
        </Heading>
        <CategoryForm />
      </Main>
    </>
  );
};

export default CategoryView;
