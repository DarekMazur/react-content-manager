import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetArticlesQuery, useUpdateArticleMutation } from '../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import { ArticleDataTypes } from '../../types/dataTypes';
import { getDate } from '../../utils/methods/getDate';
import {
  FormButton,
  FormButtonWrapper,
} from '../../components/Organisms/UserForm/UserForm.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InLink from '../../components/Atoms/InLink/InLink';

const Article = () => {
  const { id } = useParams();
  const { data: articles = [], isLoading } = useGetArticlesQuery();
  const [updateArticle] = useUpdateArticleMutation();

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleBody, setArticleBody] = useState<string>('');
  const [articleCover, setArticleCover] = useState<string>('');
  const [articleCategories, setArticleCategories] = useState<string>('');
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [articlePublished, setArticlePublished] = useState<Date | null>(null);
  const [initialValues, setInitialValues] = useState<
    ArticleDataTypes | undefined
  >(currentArticle ? { ...currentArticle } : undefined);

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
    }
  }, [currentArticle]);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldType: string,
  ) => {
    switch (fieldType) {
      case 'title':
        return setArticleTitle(e.target.value);
      case 'description':
        return setArticleDescription(e.target.value);
      case 'body':
        return setArticleBody(e.target.value);
      case 'cover':
        return setArticleCover(e.target.value);
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
      publishedAt: null,
    });
  };
  const handleOnCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentArticle(initialValues ? { ...initialValues } : undefined);
  };

  if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      {currentArticle ? (
        <section>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            {currentArticle.title}
          </Heading>
          <form
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              gap: '2rem',
              padding: '2rem',
            }}
            onSubmit={(e) => handleSubmit(e)}
            onReset={(e) => handleOnCancel(e)}
          >
            <aside>
              <img src={articleCover} alt="" style={{ maxWidth: '20vw' }} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleOnChange(e, 'cover')}
              />
              <p>
                by{' '}
                <InLink
                  target={`/users/${currentArticle.author.uuid}`}
                  name={currentArticle.author.username}
                />
              </p>
              <p>
                {articlePublished
                  ? `published at ${getDate(articlePublished)}`
                  : 'Draft'}
              </p>
              <p>category: {articleCategories}</p>
              <p>tag: {articleTags && articleTags.map((tag) => `#${tag} `)}</p>
            </aside>
            <div style={{ width: '80vw' }}>
              <input
                value={articleTitle}
                style={{ width: '100%' }}
                onChange={(e) => handleOnChange(e, 'title')}
              />
              <textarea
                value={articleDescription}
                style={{ width: '100%' }}
                onChange={(e) => handleOnChange(e, 'description')}
              />
              <div>
                <textarea
                  value={articleBody}
                  onChange={(e) => handleOnChange(e, 'body')}
                  style={{ width: '100%', minHeight: '60rem' }}
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
          </form>
        </section>
      ) : null}
    </main>
  );
};

export default Article;
