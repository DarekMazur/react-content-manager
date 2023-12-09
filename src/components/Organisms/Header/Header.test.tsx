import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/helpers/renderWithProvider.tsx';
import Header from './Header.tsx';
import { adminUser } from '../../../utils/data.ts';

const user = {
  userName: adminUser.username,
  avatar: adminUser.avatar,
  uuid: adminUser.uuid,
};

const component = renderWithProvider(
  <Header isAuthorised={true} user={user} />,
);

describe('Header component:', () => {
  it('- should display greetings for logged users', () => {
    expect(
      screen.getByText(`Hello, ${adminUser.username}!`),
    ).toBeInTheDocument();
  });

  it('- should contains icon with user avatar', () => {
    renderWithProvider(<Header isAuthorised={true} user={user} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    screen.getByAltText(`${adminUser.username} avatar`);
  });

  it('- should not be visible when user is not authorised', () => {
    renderWithProvider(<Header isAuthorised={false} />);
    expect(screen.queryAllByRole('banner')).toHaveLength(0);
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
