import Input from '../../../Molecules/Input/Input.tsx';
import { FormButton, FormButtonWrapper } from '../UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { CategoriesTypes } from '../../../../types/dataTypes.ts';
import { useGetCategoriesQuery } from '../../../../store';
import { useParams } from 'react-router';

const CategoryForm = () => {
  const { uuid } = useParams();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [currentCategory, setCurrentCategory] = useState<
    CategoriesTypes | undefined
  >(undefined);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories.find((category) => category.uuid === uuid));
    }
  }, [categories, uuid]);

  return (
    <>
      {currentCategory ? (
        <>
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
        </>
      ) : null}
    </>
  );
};

export default CategoryForm;
