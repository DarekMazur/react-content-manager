import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Header from './Header.tsx';
import { faker } from '@faker-js/faker';

const getUser = () => {
  const admin = {
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

  return admin;
};

const user = getUser();

const component = renderWithProviders(<Header user={user} />);

describe('Header component:', () => {
  it('- should display greetings for logged users', () => {
    expect(screen.getByText(`Hello, ${user.username}!`)).toBeInTheDocument();
  });

  it('- should contains icon with user avatar', () => {
    renderWithProviders(<Header user={user} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    screen.getByAltText(`avatar`);
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
