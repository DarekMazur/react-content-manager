import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store';
import { useEffect, useState } from 'react';
import { CategoriesTypes } from '../../types/dataTypes.ts';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { Loading } from '../../components/Atoms/Loading/Loading.styles.ts';
import { Main } from '../../components/Organisms/Main/Main.styles.ts';
import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Input from '../../components/Molecules/Input/Input.tsx';
import {
  FormButton,
  FormButtonWrapper,
} from '../../components/Organisms/Forms/UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <>
      {currentCategory ? (
        <Main $minHeight={wrapperHeight}>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            Category {currentCategory.title}
          </Heading>
          <form>
            <Input
              label={'Category'}
              type={'text'}
              id={'title'}
              value={currentCategory.title}
              uuid={currentCategory.uuid}
              handleOnChange={() => {}}
            />
            <div style={{ padding: '2rem 0 1rem' }}>
              <label htmlFor="description">Description</label>
              <textarea
                value={currentCategory.description}
                id="description"
                style={{
                  width: '100%',
                  margin: '0.5rem 0 0 ',
                  minHeight: '10rem',
                }}
                onChange={() => {}}
              />
            </div>
            <FormButtonWrapper>
              <FormButton $type="submit" type="submit">
                <FontAwesomeIcon icon={['fas', 'edit']} /> Save
              </FormButton>
              <FormButton $type="reset" type="reset" onClick={() => {}}>
                <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
              </FormButton>
            </FormButtonWrapper>
          </form>
        </Main>
      ) : null}
    </>
  );
};

export default CategoryView;
