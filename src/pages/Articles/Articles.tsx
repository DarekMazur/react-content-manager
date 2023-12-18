import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import Pagination from '../../components/Molecules/Pagination/Pagination.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { useSelector } from 'react-redux';

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  const selectedArticles = useSelector((state) => state.selected);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isExpand, setIsExpand] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const getPagesLength = Math.ceil(articles.length / perPage);
  const [pages, setPages] = useState(getPagesLength);

  const postsToDisplay = articles.slice(
    (Number(searchParams.get('page')) - 1) * perPage,
    perPage * Number(searchParams.get('page')),
  );

  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams((params) => {
        params.set('page', '1');
        return params;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postsToDisplay.length === 0 && Number(searchParams.get('page')) !== 1) {
      setSearchParams((params) => {
        params.set('page', String(Number(searchParams.get('page')) - 1));
        return params;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsToDisplay]);

  useEffect(() => {
    setPages(getPagesLength);
  }, [getPagesLength]);

  const handleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  const handleClose = () => {
    setIsExpand(false);
  };

  const handleChoseEntriesNumber = (value: number) => {
    handleClose();
    setPerPage(value);
  };

  const handlePageChoose = (id: number) => {
    setSearchParams((params) => {
      params.set('page', String(id));
      return params;
    });
  };

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
        Articles
      </Heading>
      {selectedArticles.length > 0 ? (
        <Wrapper width="100%" justify="flex-start" align="center">
          {selectedArticles.length} articles selected{' '}
          <button>publish all</button> <button>unpublish all</button>
        </Wrapper>
      ) : null}
      <Wrapper width="100%" justify="center" align="flex-start">
        <Table headers={articlesTableHeaders} data={postsToDisplay} />
      </Wrapper>
      <Wrapper justify="space-between" align="center" width="97.5vw">
        <EntriesNumberPicker
          perPage={perPage}
          isExpand={isExpand}
          handleExpand={handleExpand}
          handleChoseEntriesNumber={handleChoseEntriesNumber}
          handleClose={handleClose}
        />
        <Pagination
          pages={pages}
          current={Number(searchParams.get('page'))}
          handlePageChoose={handlePageChoose}
        />
      </Wrapper>
    </main>
  );
};

export default Articles;
