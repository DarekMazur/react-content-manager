import Input from '../../../Molecules/Input/Input.tsx';
import {
  EditButtonsWrapper,
  FormButton,
  FormButtonWrapper,
} from '../UserForm/UserForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ICategoriesTypes } from '../../../../types/dataTypes.ts';
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
import FormErrorMessage from '../../../Atoms/FormErrorMessage/FormErrorMessage.tsx';
import { useTranslation } from 'react-i18next';

const CategoryForm = () => {
  const initCategory: ICategoriesTypes = {
    id: 0,
    uuid: '',
    title: '',
    description: '',
  };
  const { t } = useTranslation();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory, { status, isSuccess, isLoading }] =
    useUpdateCategoryMutation();
  const [currentCategory, setCurrentCategory] = useState<
    ICategoriesTypes | undefined
  >(undefined);
  const [updatedCategory, setUpdatedCategory] =
    useState<ICategoriesTypes>(initCategory);
  const [initialValues, setInitialValues] = useState<
    ICategoriesTypes | undefined
  >(currentCategory ? { ...currentCategory } : undefined);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          category.uuid === (currentCategory as ICategoriesTypes).uuid,
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
    if (!updatedCategory.title) {
      return setErrorMessage('Title is required');
    }

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
        ids: [(currentCategory as ICategoriesTypes).id],
        title: (currentCategory as ICategoriesTypes).title,
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
          dataType={t('modal.element.category')}
        />
      ) : null}
      <>
        <StyledCategoryForm onSubmit={handleOnSubmit}>
          <Input
            label={t('category.form.category')}
            type={'text'}
            id={'title'}
            value={updatedCategory.title}
            uuid={updatedCategory.uuid}
            handleOnChange={(e) => handleOnChange(e, 'title')}
          />
          <FormErrorMessage message={errorMessage} />
          <div style={{ padding: '2rem 0 1rem' }}>
            <label htmlFor="description">
              {t('category.form.description')}
            </label>
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
                <FontAwesomeIcon icon={['fas', 'edit']} />{' '}
                {t('form.saveButton')}
              </FormButton>
              <FormButton $type="reset" type="reset" onClick={handleOnCancel}>
                <FontAwesomeIcon icon={['fas', 'xmark']} />{' '}
                {t('form.cancelButton')}
              </FormButton>
            </EditButtonsWrapper>
            <FormButton $type="delete" type="button" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'trash']} />{' '}
              {t('form.deleteButton')}
            </FormButton>
          </FormButtonWrapper>
        </StyledCategoryForm>
      </>
    </>
  );
};

export default CategoryForm;
