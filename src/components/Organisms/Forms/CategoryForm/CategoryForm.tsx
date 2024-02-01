import Input from '../../../Molecules/Input/Input.tsx';
import {
  EditButtonsWrapper,
  FormButton,
  FormButtonWrapper,
} from '../UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CategoriesTypes } from '../../../../types/dataTypes.ts';
import {
  switchPopup,
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../../../store';
import { useNavigate, useParams } from 'react-router';
import { StyledCategoryForm } from './CategoryForm.styles.ts';
import Modal from '../../Modal/Modal.tsx';
import { useDispatch } from 'react-redux';

const CategoryForm = () => {
  const initCategory: CategoriesTypes = {
    id: 0,
    uuid: '',
    title: '',
    description: '',
  };
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory, { status, isSuccess, isLoading }] =
    useUpdateCategoryMutation();
  const [currentCategory, setCurrentCategory] = useState<
    CategoriesTypes | undefined
  >(undefined);
  const [updatedCategory, setUpdatedCategory] =
    useState<CategoriesTypes>(initCategory);
  const [initialValues, setInitialValues] = useState<
    CategoriesTypes | undefined
  >(currentCategory ? { ...currentCategory } : undefined);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCurrentCategory(categories.find((category) => category.uuid === uuid));
      setInitialValues({
        ...categories.find((category) => category.uuid === uuid)!,
      });
    }
    if (
      currentCategory &&
      categories.filter(
        (category) =>
          category.uuid === (currentCategory as CategoriesTypes).uuid,
      ).length === 0
    ) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, uuid]);

  useEffect(() => {
    if (currentCategory) {
      setUpdatedCategory(currentCategory);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (isLoading) {
      setModal(true);
    }
  }, [isLoading]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldType: string,
  ) => {
    const content = e.target.value;
    switch (fieldType) {
      case 'title':
        return setUpdatedCategory({ ...updatedCategory, title: content });
      case 'description':
        return setUpdatedCategory({
          ...updatedCategory,
          description: content,
        });
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.pathname.includes('create')) {
      navigate('/categories');
      return addCategory(updatedCategory);
    }
    updateCategory(updatedCategory);
  };

  const handleOnCancel = () => {
    setCurrentCategory(initialValues ? { ...initialValues } : undefined);
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentCategory as CategoriesTypes).id],
        title: (currentCategory as CategoriesTypes).title,
      }),
    );
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {modal ? (
        <Modal
          isSuccess={isSuccess}
          isError={status === 'rejected'}
          handleCloseModal={handleCloseModal}
          dataType={'Category'}
        />
      ) : null}
      {/*{currentCategory ? (*/}
      <>
        <StyledCategoryForm onSubmit={handleOnSubmit}>
          <Input
            label={'Category'}
            type={'text'}
            id={'title'}
            value={updatedCategory.title}
            uuid={updatedCategory.uuid}
            handleOnChange={(e) => handleOnChange(e, 'title')}
          />
          <div style={{ padding: '2rem 0 1rem' }}>
            <label htmlFor="description">Description</label>
            <textarea
              value={updatedCategory.description}
              id="description"
              style={{
                width: '100%',
                margin: '0.5rem 0 0 ',
                minHeight: '10rem',
              }}
              onChange={(e) => handleOnChange(e, 'description')}
            />
          </div>
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <FormButton $type="submit" type="submit">
                <FontAwesomeIcon icon={['fas', 'edit']} /> Save
              </FormButton>
              <FormButton $type="reset" type="reset" onClick={handleOnCancel}>
                <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
              </FormButton>
            </EditButtonsWrapper>
            <FormButton $type="delete" type="button" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'trash']} /> Delete
            </FormButton>
          </FormButtonWrapper>
        </StyledCategoryForm>
      </>
      {/*) : null}*/}
    </>
  );
};

export default CategoryForm;
