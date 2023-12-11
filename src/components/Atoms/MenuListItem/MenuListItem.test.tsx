import { screen } from '@testing-library/dom';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { renderWithProvider } from '../../../utils/providers/renderWithProvider.tsx';
import MenuListItem from './MenuListItem.tsx';
import { theme } from '../../../utils/themes/theme.ts';
import { fireEvent } from '@testing-library/react';

const activeItem = renderWithProvider(
  <MenuListItem target="/">Home</MenuListItem>,
);

const inactiveItem = renderWithProvider(
  <MenuListItem target="/lorem">Lorem</MenuListItem>,
);

describe('Header top main menu list item:', () => {
  it('- should have dedicated style for active element', () => {
    expect(screen.getByRole('link', { current: 'page' })).toHaveClass('active');
  });
  it('- should have dedicated style for active element', () => {
    renderWithProvider(<MenuListItem target="/">Home</MenuListItem>);
    expect(screen.getByRole('link', { current: 'page' })).toHaveStyle({
      color: theme.colors.red,
    });
  });
  it('- should have hover effect', async () => {
    renderWithProvider(<MenuListItem target="/">Home</MenuListItem>);
    const link = screen.getByRole('link', { current: 'page' });
    fireEvent.mouseEnter(link);
    expect(link).toHaveStyleRule('color', theme.colors.white, {
      modifier: ':hover',
    });
  });
  it('- rendered component for active link match to snapshot', () => {
    expect(activeItem).toMatchSnapshot();
  });
  it('- rendered component for inactive link match to snapshot', () => {
    expect(inactiveItem).toMatchSnapshot();
  });
});
