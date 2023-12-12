import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import MenuList from './MenuList.tsx';

const component = renderWithProviders(<MenuList />);

describe('Menu list:', () => {
  it('- should be wrapped by nav element', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it('- should be list', () => {
    renderWithProviders(<MenuList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('- should contains links', () => {
    renderWithProviders(<MenuList />);
    expect(screen.queryAllByRole('link')).not.toHaveLength(0);
  });
  it('- should contains li elements', () => {
    renderWithProviders(<MenuList />);
    expect(screen.queryAllByRole('listitem')).not.toHaveLength(0);
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
