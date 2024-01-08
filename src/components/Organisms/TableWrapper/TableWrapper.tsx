import ReactPaginate from 'react-paginate';
import Wrapper from '../Wrapper/Wrapper';
import Table from '../Table/Table';
import EntriesNumberPicker from '../../Molecules/EntriesNumberPicker/EntriesNumberPicker';
import { StyledReactPaginate } from '../../Molecules/ReactPaginate/ReactPaginate.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { articlesTableHeaders } from '../../../utils/data';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleDataTypes } from '../../../types/dataTypes';

const TableWrapper = ({
  articles,
}: {
  articles: ArticleDataTypes[] | undefined;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isExpand, setIsExpand] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [pagesLength, setPagesLength] = useState(0);
  const [pages, setPages] = useState(0);
  const [postsToDisplay, setPostsToDisplay] = useState<ArticleDataTypes[]>([]);

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
    if (articles) {
      setPagesLength(Math.ceil(articles.length / perPage));
      setPostsToDisplay(
        articles.slice(
          (Number(searchParams.get('page')) - 1) * perPage,
          perPage * Number(searchParams.get('page')),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

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
    setPages(pagesLength);
  }, [pagesLength]);

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
    <>
      {articles && articles.length > 0 ? (
        <>
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
                previousLabel={
                  <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                }
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
        </>
      ) : null}
    </>
  );
};

export default TableWrapper;
