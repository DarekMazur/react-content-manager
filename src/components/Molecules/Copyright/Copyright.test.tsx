import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Copyright from './Copyright.tsx';

const component = renderWithProviders(<Copyright />);
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
    renderWithProviders(<Copyright />);
    expect(screen.getByRole('copyright')).toHaveTextContent(
      String(currentYear.getFullYear()),
    );
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
