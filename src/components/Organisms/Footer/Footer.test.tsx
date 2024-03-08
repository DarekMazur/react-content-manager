import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import FooterWrapper from './Footer.tsx';

const component = renderWithProviders(<FooterWrapper />);
const blogName = 'Leśny Gacek';
const blogLink = 'https://lesnygacek.pl';

describe('Footer component:', () => {
  it('- contains title', () => {
    expect(screen.getByText('RCM4Strapi')).toBeInTheDocument();
  });

  it('- contains copyrights', () => {
    renderWithProviders(<FooterWrapper />);
    expect(screen.getByRole('copyright')).toBeInTheDocument();
  });

  it('- contains blog link', () => {
    renderWithProviders(<FooterWrapper />);
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
