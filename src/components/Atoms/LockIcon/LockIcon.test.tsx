import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import LockIcon from './LockIcon.tsx';

const component = renderWithProviders(<LockIcon />);
describe('Lock Icon', () => {
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
