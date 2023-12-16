import Heading from '../../components/Atoms/Heading/Heading.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';
import Wrapper from '../../components/Organisms/Wrapper/Wrapper.tsx';
import { articlesTableHeaders } from '../../utils/data.ts';
import { mockTempPosts } from '../../__mock__/mockTempPosts.tsx';

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
      <EntriesNumberPicker />
    </main>
  );
};

export default Articles;
