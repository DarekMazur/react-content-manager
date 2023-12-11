import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/providers/renderWithProvider.tsx';
import FooterWrapper from './Footer.tsx';

const component = renderWithProvider(<FooterWrapper />);
const blogName = 'Leśny Gacek';
const blogLink = 'https://lesnygacek.pl';

describe('Footer component:', () => {
  it('- contains title', () => {
    expect(screen.getByText('RCM4Strapi')).toBeInTheDocument();
  });

  it('- contains copyrights', () => {
    renderWithProvider(<FooterWrapper />);
    expect(screen.getByRole('copyright')).toBeInTheDocument();
  });

  it('- contains blog link', () => {
    renderWithProvider(<FooterWrapper />);
    expect(screen.getByRole('link', { name: blogName })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: blogName })).toHaveAttribute(
      'href',
      blogLink,
    );
  });

  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
