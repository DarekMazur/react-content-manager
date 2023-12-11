import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/providers/renderWithProvider.tsx';
import ExtLink from './ExtLink.tsx';

const customLink = renderWithProvider(
  <ExtLink url="https://google.com" name="My Link" />,
);

describe('Render external link:', () => {
  it('- link contains custom label', () => {
    expect(screen.getByText('My Link'));
  });

  it('- link contains url attribute', () => {
    renderWithProvider(<ExtLink url="https://google.com" name="My Link" />);
    expect(screen.getByText('My Link')).toHaveAttribute(
      'href',
      'https://google.com',
    );
  });

  it('- link has default size', () => {
    renderWithProvider(<ExtLink url="https://google.com" name="My Link" />);
    expect(screen.getByText('My Link')).toHaveStyle('font-size: inherit');
  });

  it('- link has proper set size', () => {
    renderWithProvider(
      <ExtLink url="https://google.com" name="My Link" size="l" />,
    );
    expect(screen.getByText('My Link')).toHaveStyle(`font-size: ${2.4 * 16}px`);
  });

  it('- rendered component match to snapshot', () => {
    expect(customLink).toMatchSnapshot();
  });
});
