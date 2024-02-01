import { useNavigate, useParams } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import {
  RootState,
  switchPopup,
  useAddCategoryMutation,
  useCreateArticleMutation,
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useUpdateArticleMutation,
} from '../../../../store';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import {
  ArticleDataTypes,
  CategoriesTypes,
  UserTypes,
} from '../../../../types/dataTypes';
import InLink from '../../../Atoms/InLink/InLink';
import { getDate } from '../../../../utils/methods/getDate';
import {
  EditButtonsWrapper,
  FormButton,
  FormButtonWrapper,
} from '../UserForm/UserForm.styles';
import { StyledArticleForm } from './ArticleForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading } from '../../../Atoms/Loading/Loading.styles';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox';
import Modal from '../../Modal/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from '../../../../utils/helpers/editorConfig';
import P from '../../../Atoms/Paragraph/P';
import ImageController from '../../../Molecules/ImageControler/ImageController.tsx';
import Input from '../../../Molecules/Input/Input.tsx';
import { Tag } from '../../../Atoms/Tag/Tag.styles.ts';
import { useDispatch, useSelector } from 'react-redux';
import placeholder from '../../../../assets/placeholder.png';
import FormErrorMessage from '../../../Atoms/FormErrorMessage/FormErrorMessage';

interface OptionTypes {
  readonly label: string;
  readonly value: string;
}

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [updateArticle, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateArticleMutation();
  const [createArticle] = useCreateArticleMutation();
  const [addCategory] = useAddCategoryMutation();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleCover, setArticleCover] = useState<string>(placeholder);
  const [articleCategories, setArticleCategories] = useState<CategoriesTypes[]>(
    [],
  );
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [articlePublished, setArticlePublished] = useState<Date | null>(null);
  const [articleIsSticky, setArticleIsSticky] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    ArticleDataTypes | undefined
  >(currentArticle ? { ...currentArticle } : undefined);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<OptionTypes[]>([]);
  const [newTag, setNewTag] = useState<string | null>();
  const [editorBody, setEditorBody] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categoriesOptions: OptionTypes[] = [];
  const articleInitCategories: OptionTypes[] = [];

  useEffect(() => {
    if (categories && categories.length > 0) {
      (categories as CategoriesTypes[]).map((category) =>
        categoriesOptions.push({
          value: category.title,
          label: category.title,
        }),
      );
      setOptions(categoriesOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      setArticleCover(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      setCurrentArticle(articles.find((article) => article.id === Number(id)));
      setInitialValues({
        ...articles.find((article) => article.id === Number(id))!,
      });
    }
    if (
      currentArticle &&
      articles.filter(
        (article) => article.uuid === (currentArticle as ArticleDataTypes).uuid,
      ).length === 0
    ) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, id]);

  useEffect(() => {
    if (currentArticle) {
      setArticleTitle(currentArticle.title);
      setArticleDescription(currentArticle.description);
      setArticleCover(currentArticle.cover);
      setArticleCategories(currentArticle.categories);
      setArticleTags(currentArticle.tags);
      setArticlePublished(currentArticle.publishedAt);
      setArticleIsSticky(currentArticle.isSticky);

      currentArticle.categories.map((category) =>
        articleInitCategories.push({
          value: category.title,
          label: category.title,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticle]);

  useEffect(() => {
    if (loadingUpdate) {
      setModal(true);
    }
  }, [loadingUpdate]);

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });

  const handleEditorChange = (body: string) => {
    setErrorMessage(null);
    setEditorBody(body);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldType: string,
  ) => {
    switch (fieldType) {
      case 'description':
        return setArticleDescription(e.target.value);
      case 'sticky':
        return setArticleIsSticky((e.target as HTMLInputElement).checked);
    }
  };

  const handleSelectChange = (value: OptionTypes[]) => {
    const articleCategories: CategoriesTypes[] = [];
    for (let i = 0; i < value.length; ++i) {
      categories.map((category) =>
        category.title === value[i].value
          ? articleCategories.push(category)
          : null,
      );
    }
    setArticleCategories(articleCategories);
  };

  const handleRemoveTag = (removed: string) => {
    setArticleTags((prevState) => prevState.filter((tag) => tag !== removed));
  };

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    setOptions((prev) => [...prev, newOption]);
    const newCategory = {
      title: newOption.label,
      description: '',
    };
    addCategory(newCategory);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    isDraft?: boolean,
  ) => {
    e.preventDefault();

    const publishedStatus = () => {
      if (isDraft) {
        return null;
      } else {
        return articlePublished ? articlePublished : new Date();
      }
    };

    const CKETitle = editorBody.match(/<h1>.*<\/h1>/) || '';
    const CKEBody = editorBody.replace(CKETitle[0], '');

    if (
      CKETitle.length === 0 ||
      CKETitle[0].replace(/<\/?h1>/g, '') === '&nbsp;'
    ) {
      return setErrorMessage(
        !CKEBody
          ? 'Article title and content are required'
          : 'Article title is required',
      );
    }

    if (!CKEBody || CKEBody.replace(/<\/?p>/g, '') === '&nbsp;') {
      return setErrorMessage('Article content is required');
    }

    if (location.pathname.includes('create')) {
      const newArticle = {
        ...currentArticle,
        title: CKETitle[0].replace(/<\/?h1>/g, ''),
        description: articleDescription,
        categories: articleCategories,
        body: CKEBody,
        cover: articleCover,
        isSticky: articleIsSticky,
        tags: articleTags,
        author: currentUser,
        publishedAt: publishedStatus(),
      };
      createArticle({
        ...newArticle,
      });
      navigate('/articles');
    }

    updateArticle({
      ...currentArticle,
      title: CKETitle[0].replace(/<\/?h1>/g, ''),
      description: articleDescription,
      categories: articleCategories,
      body: CKEBody,
      cover: articleCover,
      isSticky: articleIsSticky,
      tags: articleTags,
      publishedAt: publishedStatus(),
    });
  };

  const handleOnCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentArticle(initialValues ? { ...initialValues } : undefined);
    navigate(-1);
  };

  const handleNewTags = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',') {
      setArticleTags((prevState) => [
        ...prevState,
        (e.target as HTMLInputElement).value.slice(0, -1),
      ]);
      setNewTag(null);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentArticle as ArticleDataTypes).id],
        title: (currentArticle as ArticleDataTypes).title,
      }),
    );
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      {modal ? (
        <Modal
          isSuccess={isSuccess}
          isError={status === 'rejected'}
          handleCloseModal={handleCloseModal}
          dataType="Article"
        />
      ) : null}
      <StyledArticleForm
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleOnCancel(e)}
      >
        <aside>
          <ImageController
            image={image}
            defaultImage={articleCover}
            altText={`${articleTitle} cover image`}
            imageUrl={imageUrl as string}
            onFilesChange={(selectedFiles) => setImage(selectedFiles)}
          />
          <P>
            by{' '}
            <InLink
              target={
                currentArticle
                  ? `/users/${currentArticle.author.uuid}`
                  : `/users/${(currentUser as UserTypes).uuid}`
              }
              name={
                currentArticle
                  ? currentArticle.author.username
                  : (currentUser as UserTypes).username
              }
            />
          </P>
          <P>
            {articlePublished
              ? `published at ${getDate(articlePublished)}`
              : 'Draft'}
          </P>
          <div style={{ position: 'relative', zIndex: '3' }}>
            category:{' '}
            <CreatableSelect
              noOptionsMessage={() => 'create first category'}
              defaultValue={articleInitCategories}
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              options={options}
              onChange={(newValue) =>
                handleSelectChange(newValue as OptionTypes[])
              }
              onCreateOption={handleCreate}
            />
          </div>
          <div>
            <P>tag:</P>
            <P>
              {articleTags && articleTags.length > 0
                ? articleTags.map((tag, index) => (
                    <Tag key={index}>
                      <FontAwesomeIcon
                        style={{
                          fontSize: '1.3rem',
                          marginRight: '0.5rem',
                          cursor: 'pointer',
                        }}
                        icon={['fas', 'xmark']}
                        onClick={() => handleRemoveTag(tag)}
                      />
                      {tag}
                    </Tag>
                  ))
                : 'No tags yet'}
            </P>
            <Input
              label={'Add tags:'}
              type={'text'}
              id={'tags'}
              value={newTag ? newTag : ''}
              uuid={''}
              placeholder={"separate with coma ','"}
              handleOnChange={(e) => handleNewTags(e)}
              handleKeyPress={(e) => handleOnKeyPress(e)}
            />
          </div>
          <InputCheckbox
            label="Sticky"
            id="sticky"
            value={articleIsSticky}
            handleOnChange={(e) => handleOnChange(e, 'sticky')}
          />
        </aside>
        <div style={{ width: '80vw' }}>
          <CKEditor
            editor={ClassicEditor}
            data={`<h1>${currentArticle ? currentArticle.title : ''}</h1>${
              currentArticle ? currentArticle.body : ''
            }`}
            config={editorConfiguration}
            onChange={(_event, editor) => handleEditorChange(editor.getData())}
          />
          <FormErrorMessage message={errorMessage} />
          <div style={{ padding: '2rem 0 1rem' }}>
            <label htmlFor="description">Article description</label>
            <textarea
              value={articleDescription}
              id="description"
              style={{ width: '100%', margin: '0.5rem 0 0 ' }}
              onChange={(e) => handleOnChange(e, 'description')}
            />
          </div>
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <div>
                <FormButton $type="submit" type="submit">
                  <FontAwesomeIcon icon={['fas', 'save']} />{' '}
                  {currentArticle && currentArticle.publishedAt
                    ? 'Save'
                    : 'Publish'}
                </FormButton>
                <FormButton
                  $type="submit"
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  <FontAwesomeIcon icon={['fas', 'clipboard']} />{' '}
                  {currentArticle && currentArticle.publishedAt
                    ? 'Unpublish'
                    : 'Draft'}
                </FormButton>
              </div>
              <FormButton $type="reset" type="reset">
                <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
              </FormButton>
            </EditButtonsWrapper>
            <FormButton $type="delete" type="button" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'trash']} /> Delete
            </FormButton>
          </FormButtonWrapper>
        </div>
      </StyledArticleForm>
    </>
  );
};

export default ArticleForm;
