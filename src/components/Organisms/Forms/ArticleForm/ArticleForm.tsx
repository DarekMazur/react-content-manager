import { useNavigate, useParams } from 'react-router';
import {
  useGetArticlesQuery,
  useUpdateArticleMutation,
} from '../../../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ArticleDataTypes } from '../../../../types/dataTypes';
import InLink from '../../../Atoms/InLink/InLink';
import { getDate } from '../../../../utils/methods/getDate';
import { FormButton, FormButtonWrapper } from '../UserForm/UserForm.styles';
import { StyledArticleForm } from './ArticleForm.styles.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading } from '../../../Atoms/Loading/Loading.styles';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox';
import Modal from '../../Modal/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from '../../../../utils/helpers/editorConfig';
import P from '../../../Atoms/Paragraph/P';
import ImageControler from '../../../Molecules/ImageControler/ImageControler';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const [updateArticle, { status, isSuccess, isLoading: loadingUpdate }] =
    useUpdateArticleMutation();

  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleBody, setArticleBody] = useState<string>('');
  const [articleCover, setArticleCover] = useState<string>('');
  const [articleCategories, setArticleCategories] = useState<string>('');
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [articlePublished, setArticlePublished] = useState<Date | null>(null);
  const [articleIsSticky, setArticleIsSticky] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<
    ArticleDataTypes | undefined
  >(currentArticle ? { ...currentArticle } : undefined);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

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
  }, [articles, id]);

  useEffect(() => {
    if (currentArticle) {
      setArticleTitle(currentArticle.title);
      setArticleDescription(currentArticle.description);
      setArticleBody(currentArticle.body);
      setArticleCover(currentArticle.cover);
      setArticleCategories(currentArticle.categories);
      setArticleTags(currentArticle.tags);
      setArticlePublished(currentArticle.publishedAt);
      setArticleIsSticky(currentArticle.isSticky);
    }
  }, [currentArticle]);

  useEffect(() => {
    if (loadingUpdate) {
      setModal(true);
    }
  }, [loadingUpdate]);

  const handleEditorChange = (body: string) => {
    const headerTitle = body.match(/<h1>.*<\/h1>/) || '';
    if (headerTitle[0].replace(/<\/?h1>/g, '') !== articleTitle) {
      return setArticleTitle(headerTitle[0].replace(/<\/?h1>/g, ''));
    }

    if (body.replace(headerTitle[0], '') !== articleBody) {
      return setArticleBody(body.replace(headerTitle[0], ''));
    }
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateArticle({
      ...currentArticle,
      title: articleTitle,
      description: articleDescription,
      body: articleBody,
      cover: articleCover,
      isSticky: articleIsSticky,
      publishedAt: articlePublished ? articlePublished : new Date(),
    });
  };

  const handleDraft = () => {
    updateArticle({
      ...currentArticle,
      title: articleTitle,
      description: articleDescription,
      body: articleBody,
      cover: articleCover,
      isSticky: articleIsSticky,
      publishedAt: null,
    });
  };

  const handleOnCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentArticle(initialValues ? { ...initialValues } : undefined);
    navigate(-1);
  };

  const handleCloseModal = () => {
    setModal(false);
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
        {currentArticle ? (
          <>
            <aside>
              {/* <img src={articleCover} alt="" style={{ maxWidth: '20vw' }} /> */}
              <ImageControler
                image={image}
                defaultImage={articleCover}
                altText={`${articleTitle} cover image`}
                imageUrl={imageUrl as string}
                onFilesChange={(selectedFilies) => setImage(selectedFilies)}
              />
              <P>
                by{' '}
                <InLink
                  target={`/users/${currentArticle.author.uuid}`}
                  name={currentArticle.author.username}
                />
              </P>
              <P>
                {articlePublished
                  ? `published at ${getDate(articlePublished)}`
                  : 'Draft'}
              </P>
              <P>category: {articleCategories}</P>
              <P>tag: {articleTags && articleTags.map((tag) => `#${tag} `)}</P>
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
                data={`<h1>${currentArticle.title}</h1>${articleBody}`}
                config={editorConfiguration}
                onChange={(_event, editor) =>
                  handleEditorChange(editor.getData())
                }
              />
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
                <FormButton $type="reset" type="reset">
                  <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
                </FormButton>
                <div>
                  <FormButton $type="submit" type="submit">
                    <FontAwesomeIcon icon={['fas', 'save']} /> Publish
                  </FormButton>
                  <FormButton
                    $type="submit"
                    type="button"
                    onClick={handleDraft}
                  >
                    <FontAwesomeIcon icon={['fas', 'clipboard']} /> Draft
                  </FormButton>
                </div>
              </FormButtonWrapper>
            </div>
          </>
        ) : null}
      </StyledArticleForm>
    </>
  );
};

export default ArticleForm;
