import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Header from './Header.tsx';
import { adminUser } from '../../../utils/data.ts';

const user = {
  userName: adminUser.username,
  avatar: adminUser.avatar,
  uuid: adminUser.uuid,
};

const component = renderWithProviders(<Header user={user} />);

describe('Header component:', () => {
  it('- should display greetings for logged users', () => {
    expect(
      screen.getByText(`Hello, ${adminUser.username}!`),
    ).toBeInTheDocument();
  });

  it('- should contains icon with user avatar', () => {
    renderWithProviders(<Header user={user} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    screen.getByAltText(`${adminUser.username} avatar`);
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
