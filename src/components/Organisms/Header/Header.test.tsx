import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Header from './Header.tsx';
import { mockUsers } from '../../../__mock__/mockUsers.ts';

const getUser = () => {
  const admins = mockUsers.filter((user) => user.role.id === 1);
  const getRandomIndex = Math.floor(Math.random() * admins.length);

  return admins[getRandomIndex];
};
const user = {
  userName: getUser().username,
  avatar: getUser().avatar,
  uuid: getUser().uuid,
};

const component = renderWithProviders(<Header user={user} />);

describe('Header component:', () => {
  it('- should display greetings for logged users', () => {
    expect(screen.getByText(`Hello, ${user.userName}!`)).toBeInTheDocument();
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
