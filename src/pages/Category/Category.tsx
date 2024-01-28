import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { CategoriesTypes } from '../../types/dataTypes.ts';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';

const CategoryView = () => {
  const { uuid } = useParams();
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<
    CategoriesTypes | undefined
  >(undefined);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories.find((category) => category.uuid === uuid));
    }
  }, [categories, uuid]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main $minHeight={wrapperHeight}>
      <form>{currentCategory?.title}</form>
    </Main>
  );
};

export default CategoryView;
