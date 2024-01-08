import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFooterHeight } from '../../utils/methods/getFooterHeight.ts';
import { useSelector } from 'react-redux';
import { RootState, useGetArticlesQuery } from '../../store/index.ts';
import MultiAction from '../../components/Molecules/MultiAction/MultiAction.tsx';
import { ArticleDataTypes } from '../../types/dataTypes.ts';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledReactPaginate = styled.div`
  .pagination {
    margin: 0;
    padding: 0;
    list-style-type: none;
    min-width: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-nav {
    font-size: 1.4rem;
    color: inherit;
    cursor: pointer;
  }

  .page-item,
  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem;
    border-radius: 0.3rem;
    height: 3rem;
    width: 3rem;
    padding: 0 0.5rem;
    font-weight: inherit;
    color: inherit;
    cursor: pointer;
  }

  .page-item {
    transition: 200ms background-color ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightBlue};
    }
  }

  .active {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.red};
    cursor: 'auto';

    &:hover {
      background-color: unset;
    }
  }

  .disabled {
    color: ${({ theme }) => theme.colors.darkBlueTransparent};
    cursor: auto;
  }
`;

const Articles = () => {
  const { data: articles = [] } = useGetArticlesQuery();

  const selectedArticles = useSelector<RootState>((state) => state.selected);

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

  const handlePageClick = (e: { selected: number }) => {
    setSearchParams((params) => {
      params.set('page', String(e.selected + 1));
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
      {(selectedArticles as ArticleDataTypes[]).length > 0 ? (
        <MultiAction
          counter={(selectedArticles as ArticleDataTypes[]).length}
        />
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
        <StyledReactPaginate>
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={['fas', 'chevron-left']} />}
            nextLabel={<FontAwesomeIcon icon={['fas', 'chevron-right']} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pages}
            previousClassName="page-nav"
            previousLinkClassName="page-link"
            nextClassName="page-nav"
            nextLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </StyledReactPaginate>
      </Wrapper>
    </main>
  );
};

export default Articles;
