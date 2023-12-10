import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/helpers/renderWithProvider.tsx';
import MenuList from './MenuList.tsx';

const component = renderWithProvider(<MenuList />);

describe('Menu list:', () => {
  it('- should be wrapped by nav element', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it('- should be list', () => {
    renderWithProvider(<MenuList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('- should contains links', () => {
    renderWithProvider(<MenuList />);
    expect(screen.queryAllByRole('link')).not.toHaveLength(0);
  });
  it('- should contains li elements', () => {
    renderWithProvider(<MenuList />);
    expect(screen.queryAllByRole('listitem')).not.toHaveLength(0);
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
