import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';
import { mockTempPosts } from '../../__mock__/mockTempPosts.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';

export const StyledPagination = styled.div`
  min-width: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding: 0 0.5rem;
  }
`;

interface PaginationProps {
  pages: number;
}

const Pagination: FC<PaginationProps> = ({ pages }) => {
  const paginationValues = (pages: number) => {
    const pagesEnums = [];
    for (let i = 1; i <= pages; i++) {
      pagesEnums.push(i);
    }

    return pagesEnums;
  };

  return (
    <StyledPagination>
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-left']}
      />
      {paginationValues(pages).map((number) => (
        <span key={number}>{number}</span>
      ))}
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-right']}
      />
    </StyledPagination>
  );
};

const Articles = () => {
  const tempFakePosts = mockTempPosts;

  const [isExpand, setIsExpand] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const getPagesLength = Math.ceil(tempFakePosts.length / perPage);
  const [pages, setPages] = useState(getPagesLength);

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

  return (
    <main>
      <Heading tag="h2" align="center" size="l">
        Articles
      </Heading>
      <Wrapper width="100vw" justify="center" align="center">
        <Table headers={articlesTableHeaders} data={tempFakePosts} />
      </Wrapper>
      <Wrapper justify="space-between" align="center" width="97.5vw">
        <EntriesNumberPicker
          perPage={perPage}
          isExpand={isExpand}
          handleExpand={handleExpand}
          handleChoseEntriesNumber={handleChoseEntriesNumber}
          handleClose={handleClose}
        />
        <Pagination pages={pages} />
      </Wrapper>
    </main>
  );
};

export default Articles;
