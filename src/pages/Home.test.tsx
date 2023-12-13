import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import Home from './Home.tsx';
import { mockUsers } from '../__mock__/mockUsers.ts';
import { renderWithProviders } from '../utils/providers/renderWithProviders.tsx';

const user = mockUsers.filter((user) => user.role.type === 'admin')[0];
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
