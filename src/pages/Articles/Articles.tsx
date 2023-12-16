import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';
import { mockTempPosts } from '../../__mock__/mockTempPosts.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const StyledPagination = styled.div`
  min-width: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Pagination = () => {
  return (
    <StyledPagination>
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-left']}
      />
      <span>1</span>
      <FontAwesomeIcon
        style={{ fontSize: '1.4rem' }}
        icon={['fas', 'chevron-right']}
      />
    </StyledPagination>
  );
};

const Articles = () => {
  const tempFakePosts = mockTempPosts;

  return (
    <main>
      <Heading tag="h2" align="center" size="l">
        Articles
      </Heading>
      <Wrapper width="100vw" justify="center" align="center">
        <Table headers={articlesTableHeaders} data={tempFakePosts} />
      </Wrapper>
      <Wrapper justify="space-between" align="center" width="97.5vw">
        <EntriesNumberPicker />
        <Pagination />
      </Wrapper>
    </main>
  );
};

export default Articles;
