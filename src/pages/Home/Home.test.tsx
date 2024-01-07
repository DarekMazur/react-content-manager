import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import Home from './Home.tsx';
import { renderWithProviders } from '../../utils/providers/renderWithProviders.tsx';
import { faker } from '@faker-js/faker';

const user = {
  uuid: faker.string.uuid(),
  id: faker.number.int(),
  username: faker.helpers.fake(`{{person.firstName}} {{person.lastName}}`),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  provider: 'local',
  confirmed: faker.datatype.boolean(0.8),
  blocked: faker.datatype.boolean(0.15),
  role: {
    id: 1,
    name: 'Administrator',
    description: 'Page admin',
    type: 'admin',
  },
};

const page = renderWithProviders(<Home user={user} />);
describe('Home page', () => {
  it('- should contains user role in level 3 heading', () => {
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(
      screen.getByText('You are logged in as Administrator'),
    ).toBeInTheDocument();
  });
  it('- rendered page match to snapshot', () => {
    expect(page).toMatchSnapshot();
  });
});
