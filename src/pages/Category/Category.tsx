import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { CategoriesTypes } from '../../types/dataTypes.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import CategoryForm from '../../components/Organisms/Forms/CategoryForm/CategoryForm.tsx';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { useMinHeight } from '../../utils/hooks/useMinHeight.ts';

const CategoryView = () => {
  const { uuid } = useParams();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const height = useMinHeight();
  const [currentCategory, setCurrentCategory] = useState<
    CategoriesTypes | undefined
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
      {currentCategory ? (
        <Main $minHeight={height}>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            Category {currentCategory.title}
          </Heading>
          <CategoryForm />
        </Main>
      ) : null}
    </>
  );
};

export default CategoryView;
