import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import ExtLink from './ExtLink.tsx';

const customLink = renderWithProviders(
  <ExtLink url="https://google.com" name="My Link" />,
);

describe('Render external link:', () => {
  it('- link contains custom label', () => {
    expect(screen.getByText('My Link'));
  });

  it('- link contains url attribute', () => {
    renderWithProviders(<ExtLink url="https://google.com" name="My Link" />);
    expect(screen.getByText('My Link')).toHaveAttribute(
      'href',
      'https://google.com',
    );
  });

  it('- link has default size', () => {
    renderWithProviders(<ExtLink url="https://google.com" name="My Link" />);
    expect(screen.getByText('My Link')).toHaveStyle('font-size: inherit');
  });

  it('- link has proper set size', () => {
    renderWithProviders(
      <ExtLink url="https://google.com" name="My Link" size="l" />,
    );
    expect(screen.getByText('My Link')).toHaveStyle(`font-size: ${2.4 * 16}px`);
  });

  it('- rendered component match to snapshot', () => {
    expect(customLink).toMatchSnapshot();
  });
});
