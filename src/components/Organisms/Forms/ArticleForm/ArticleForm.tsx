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
import { useTranslation } from 'react-i18next';
import {
  IArticleData,
  IArticlesDataTypes,
} from '../../../../types/articleTypes.ts';
import {
  IStrapiFileTypes,
  IStrapiImagePostFormat,
} from '../../../../types/strapiTypes.ts';
import { ICategoryData } from '../../../../types/categoryTypes.ts';
import { IStrapiUser } from '../../../../types/userTypes.ts';
import Uploading from '../../../Atoms/Uploading/Uploading.tsx';
import { Italic } from '../../../Atoms/Italic/Italic.styles.ts';

interface IOptionTypes {
  readonly label: string;
  readonly value: string;
}

const ArticleForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: articles, isLoading } = useGetArticlesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [updateArticle, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateArticleMutation();
  const [createArticle] = useCreateArticleMutation();
  const [addCategory] = useAddCategoryMutation();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [currentArticle, setCurrentArticle] = useState<IArticleData | null>();

  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleCover, setArticleCover] = useState<
    IStrapiFileTypes | IStrapiImagePostFormat | string | null
  >(placeholder);
  const [articleCategories, setArticleCategories] = useState<ICategoryData[]>(
    [],
  );
  const [articleTags, setArticleTags] = useState<string>('');
  const [articlePublished, setArticlePublished] = useState<Date | null>(null);
  const [articleIsSticky, setArticleIsSticky] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<IArticleData | undefined>(
    currentArticle ? { ...currentArticle } : undefined,
  );
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<IOptionTypes[]>([]);
  const [newTag, setNewTag] = useState<string | null>();
  const [editorBody, setEditorBody] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const articleInitCategories: IOptionTypes[] = [];

  const [initCategoriesOption, setInitCategoriesOption] = useState<
    IOptionTypes[] | null
  >();

  useEffect(() => {
    const categoriesOptions: IOptionTypes[] = [];
    if (categories && categories.data.length > 0) {
      categories.data.map((category) =>
        categoriesOptions.push({
          value: category.attributes.title,
          label: category.attributes.title,
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
      const fetchImage = async () => {
        setDisabled(true);
        setImageLoading(true);
        const myImage = await fetch(imageUrl);
        const myBlob = await myImage.blob();
        const formData = new FormData();
        formData.append('files', myBlob, imageUrl);

        await fetch(`${import.meta.env.VITE_API_URL}upload`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const file = { ...data[0] };
            // delete filtered.id;
            // const file = {
            //   data: {
            //     id: data[0].id,
            //     ...filtered,
            //   },
            // };
            setArticleCover(file);
            setDisabled(false);
            setImageLoading(false);
          });
      };
      // noinspection JSIgnoredPromiseFromCall
      fetchImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    if (articles && (articles as IArticlesDataTypes).data.length > 0) {
      articles &&
        setCurrentArticle(
          articles.data.find((article) => article.id === Number(id)),
        );
      articles &&
        setInitialValues({
          ...articles.data.find((article) => article.id === Number(id))!,
        });
    }
    if (
      articles &&
      currentArticle &&
      articles.data.filter(
        (article) =>
          article.attributes.uuid ===
          (currentArticle as IArticleData).attributes.uuid,
      ).length === 0
    ) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, id]);

  useEffect(() => {
    if (currentArticle) {
      setArticleTitle(currentArticle.attributes.title);
      setArticleDescription(currentArticle.attributes.description);
      setArticleCover(currentArticle.attributes.cover);
      setArticleCategories(currentArticle.attributes.categories.data);
      setArticleTags(currentArticle.attributes.tags);
      setArticlePublished(currentArticle.attributes.publishedAt);
      setArticleIsSticky(currentArticle.attributes.isSticky);

      currentArticle.attributes.categories.data.map((category) => {
        articleInitCategories.push({
          value: category.attributes.title,
          label: category.attributes.title,
        });
      });
      setInitCategoriesOption(articleInitCategories);
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

  const handleSelectChange = (value: IOptionTypes[]) => {
    const articleCategories: ICategoryData[] = [];
    for (let i = 0; i < value.length; ++i) {
      categories &&
        categories.data.map((category) =>
          category.attributes.title === value[i].value
            ? articleCategories.push(category)
            : null,
        );
    }
    setArticleCategories(articleCategories);
  };

  const handleRemoveTag = (removed: string) => {
    setArticleTags((prevState) =>
      prevState
        .split(',')
        .filter((tag) => tag !== removed)
        .toString(),
    );
  };

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    setOptions((prev) => [...prev, newOption]);
    const newCategory = {
      data: {
        title: newOption.label,
        description: '',
      },
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

    const dataToUpload = {
      data: {
        id: currentArticle?.id,
        ...currentArticle?.attributes,
        title: CKETitle[0].replace(/<\/?h1>/g, ''),
        description: articleDescription,
        categories: articleCategories,
        body: CKEBody,
        cover:
          typeof articleCover === 'string'
            ? null
            : (articleCover as IStrapiFileTypes).data?.attributes
              ? {
                  id: (articleCover as IStrapiFileTypes).data.id,
                  ...(articleCover as IStrapiFileTypes).data.attributes,
                }
              : articleCover,
        isSticky: articleIsSticky,
        tags: articleTags,
        publishedAt: publishedStatus(),
      },
    };

    if (location.pathname.includes('create')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataToUpload.data.author = { connect: [currentUser.id] };
      createArticle(dataToUpload);
      navigate('/articles');
    } else {
      dataToUpload.data.updatedAt = new Date();

      updateArticle(dataToUpload);
    }
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
    e.preventDefault();

    if (e.key === ',') {
      setArticleTags((prevState) =>
        [
          ...prevState.split(','),
          (e.target as HTMLInputElement).value.slice(0, -1),
        ].toString(),
      );
      setNewTag(null);
    }
  };

  const handleCloseModal = () => {
    setModal(false);

    if (status !== 'rejected') {
      navigate(0);
    }
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentArticle as IArticleData).id],
        title: (currentArticle as IArticleData).attributes.title,
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
          dataType={t('modal.element.article')}
        />
      ) : null}
      <StyledArticleForm
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleOnCancel(e)}
      >
        <aside>
          {imageLoading ? (
            <Uploading />
          ) : (
            <ImageController
              image={image}
              defaultImage={
                articleCover && (articleCover as IStrapiFileTypes).data
                  ? (articleCover as IStrapiFileTypes).data.attributes
                    ? (articleCover as IStrapiFileTypes).data.attributes.formats
                        .small.url
                    : (articleCover as IStrapiImagePostFormat).data.formats
                        .small.url
                  : imageUrl
                    ? imageUrl
                    : placeholder
              }
              altText={`${articleTitle} cover image`}
              imageUrl={imageUrl as string}
              onFilesChange={(selectedFiles) => setImage(selectedFiles)}
            />
          )}
          {currentArticle?.attributes.author.data ? (
            <P>
              {t('article.form.author')}{' '}
              <InLink
                target={
                  currentArticle
                    ? `/users/${currentArticle.attributes.author.data.attributes.uuid}`
                    : `/users/${(currentUser as IStrapiUser).uuid}`
                }
                name={
                  currentArticle
                    ? currentArticle.attributes.author.data.attributes.username
                    : (currentUser as IStrapiUser).username
                }
              />
            </P>
          ) : (
            <Italic>{t('article.form.noAuthor')}</Italic>
          )}
          <P>
            {articlePublished ? (
              t('article.form.publishedAt', { date: getDate(articlePublished) })
            ) : (
              <strong>{t('article.form.draft')}</strong>
            )}
          </P>
          <div style={{ position: 'relative', zIndex: '3' }}>
            {t('article.form.categoryLabel')}{' '}
            {initCategoriesOption ? (
              <CreatableSelect
                noOptionsMessage={() => 'create first category'}
                defaultValue={initCategoriesOption}
                isMulti
                isClearable
                isSearchable
                closeMenuOnSelect={false}
                options={options}
                onChange={(newValue) =>
                  handleSelectChange(newValue as IOptionTypes[])
                }
                onCreateOption={handleCreate}
              />
            ) : null}
          </div>
          <div>
            <P>{t('article.form.tagLabel')}</P>
            <P>
              {articleTags && articleTags.split(',').length > 0
                ? articleTags.split(',').map((tag, index) => (
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
                : t('article.form.noTags')}
            </P>
            <Input
              label={t('article.form.addTags')}
              type={'text'}
              id={'tags'}
              value={newTag ? newTag : ''}
              uuid={''}
              placeholder={t('article.form.tagsPlaceholder')}
              handleOnChange={(e) => handleNewTags(e)}
              handleKeyPress={(e) => handleOnKeyPress(e)}
            />
          </div>
          <InputCheckbox
            label={t('article.form.sticky')}
            id="sticky"
            value={articleIsSticky}
            handleOnChange={(e) => handleOnChange(e, 'sticky')}
          />
        </aside>
        <div style={{ width: '80vw' }}>
          <CKEditor
            editor={ClassicEditor}
            data={`<h1>${
              currentArticle ? currentArticle.attributes.title : ''
            }</h1>${currentArticle ? currentArticle.attributes.body : ''}`}
            config={editorConfiguration}
            onChange={(_event, editor) => handleEditorChange(editor.getData())}
          />
          <FormErrorMessage message={errorMessage} />
          <div style={{ padding: '2rem 0 1rem' }}>
            <label htmlFor="description">{t('article.form.description')}</label>
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
                <FormButton $type="submit" type="submit" disabled={disabled}>
                  <FontAwesomeIcon icon={['fas', 'save']} />{' '}
                  {currentArticle && currentArticle.attributes.publishedAt
                    ? t('article.form.button.save')
                    : t('article.form.button.publish')}
                </FormButton>
                <FormButton
                  $type="submit"
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  <FontAwesomeIcon icon={['fas', 'clipboard']} />{' '}
                  {currentArticle && currentArticle.attributes.publishedAt
                    ? t('article.form.button.unpublish')
                    : t('article.form.button.draft')}
                </FormButton>
              </div>
              <FormButton $type="reset" type="reset">
                <FontAwesomeIcon icon={['fas', 'xmark']} />{' '}
                {t('form.cancelButton')}
              </FormButton>
            </EditButtonsWrapper>
            <FormButton $type="delete" type="button" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'trash']} />{' '}
              {t('form.deleteButton')}
            </FormButton>
          </FormButtonWrapper>
        </div>
      </StyledArticleForm>
      {/*<input type="file" id="image" accept="image/*" onChange={handleTest} />*/}
    </>
  );
};

export default ArticleForm;
