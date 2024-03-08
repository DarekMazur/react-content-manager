import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import CategoryForm from '../../components/Organisms/Forms/CategoryForm/CategoryForm.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';
import { useTranslation } from 'react-i18next';
import { ICategoryData } from '../../types/categoryTypes.ts';

const CategoryView = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const height = useMinHeight();
  const [currentCategory, setCurrentCategory] = useState<
    ICategoryData | undefined
  >(undefined);

  useEffect(() => {
    if (categories && categories.data.length > 0) {
      setCurrentCategory(
        categories.data.find((category) => category.attributes.uuid === uuid),
      );
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
            ? t('category.headerSingular', {
                title: currentCategory.attributes.title,
              })
            : t('category.newCategory')}
        </Heading>
        <CategoryForm />
      </Main>
    </>
  );
};

export default CategoryView;
