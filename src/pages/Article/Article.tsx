import { useParams } from 'react-router';
import Heading from '../../components/Atoms/Heading/Heading';
import { useGetArticlesQuery } from '../../store';
import { useEffect, useState } from 'react';
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

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentArticle, setCurrentArticle] =
    useState<ArticleDataTypes | null>();

  useEffect(() => {
    setCurrentArticle(articles.find((article) => article.id === Number(id))!);
  }, [articles, id]);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

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
          >
            <aside>
              <img
                src={currentArticle.cover}
                alt=""
                style={{ maxWidth: '20vw' }}
              />
              <input type="file" accept="image/*" />
              <p>
                by{' '}
                <InLink
                  target={`/users/${currentArticle.author.uuid}`}
                  name={currentArticle.author.username}
                />
              </p>
              <p>
                {currentArticle.publishedAt
                  ? `published at ${getDate(currentArticle.publishedAt)}`
                  : 'Draft'}
              </p>
              <p>category: {currentArticle.categories}</p>
              <p>tag: {currentArticle.tags.map((tag) => `#${tag} `)}</p>
            </aside>
            <div style={{ width: '80vw' }}>
              <input value={currentArticle.title} style={{ width: '100%' }} />
              <textarea
                value={currentArticle.description}
                style={{ width: '100%' }}
              />
              <div>
                <textarea
                  value={currentArticle.body}
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
                  <FormButton $type="submit" type="button">
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
