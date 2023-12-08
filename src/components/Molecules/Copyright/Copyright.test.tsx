import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/helpers/renderWithProvider.tsx';
import Copyright from './Copyright.tsx';

const component = renderWithProvider(<Copyright />);
const currentYear = new Date();

describe('Copyright component:', () => {
  it('- contains link', () => {
    expect(screen.getByRole('link', { name: 'Nerdistry' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Nerdistry' })).toHaveAttribute(
      'href',
      'https://nerdistry.pl',
    );
  });

  it('- contains current year', () => {
    renderWithProvider(<Copyright />);
    expect(screen.getByRole('copyright')).toHaveTextContent(
      String(currentYear.getFullYear()),
    );
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
