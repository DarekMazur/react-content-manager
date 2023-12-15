import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { faker } from '@faker-js/faker';
import { getDate } from '../../utils/methods/getDate.ts';
import TableActionIcons from '../../components/Molecules/TableActionIcons/TableActionIcons.tsx';
import Table from '../../components/Organisms/Table/Table.tsx';
import EntriesNumberPicker from '../../components/Molecules/EntriesNumberPicker/EntriesNumberPicker.tsx';

const Articles = () => {
  const tempFakePosts = [];

  for (let i = 0; i < 5; i++) {
    const post = {
      title: faker.lorem.sentence({ min: 2, max: 5 }),
      author: faker.person.fullName(),
      status: faker.datatype.boolean(),
      sticky: faker.datatype.boolean(),
      categories: `${faker.lorem.word()}, ${faker.lorem.word()}`,
      comments: faker.number.int({ min: 0, max: 100 }),
      likes: faker.number.int({ min: 0, max: 1000 }),
      publishedAt: getDate(faker.date.recent()),
      actions: <TableActionIcons postId={i + 1} />,
    };

    tempFakePosts.push(post);
  }

  const tableHeaders = [
    '',
    'ID',
    'Status',
    'Title',
    'Author',
    'Sticky',
    'Categories',
    'Comments',
    'Likes',
    'Published at',
    '',
  ];

  return (
    <main>
      <Heading tag="h2" align="center" size="l">
        Articles
      </Heading>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Table headers={tableHeaders} data={tempFakePosts} />
      </div>
      <EntriesNumberPicker />
    </main>
  );
};

export default Articles;
