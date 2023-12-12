import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import P from './P.tsx';
import { faker } from '@faker-js/faker';
import { theme } from '../../../utils/themes/theme.ts';

const content = faker.lorem.paragraph(15);
const component = renderWithProviders(<P>{content}</P>);

describe('Paragraph component', () => {
  it('- should contains content', () => {
    expect(screen.getByText(content)).toBeInTheDocument();
  });
  it('- should get size prop', () => {
    renderWithProviders(<P size="l">{content}</P>);
    expect(screen.getByText(content)).toHaveStyle({
      'font-size': `${16 * 2.4}px`,
    });
  });
  it('- should get color prop', () => {
    renderWithProviders(<P color="red">{content}</P>);
    expect(screen.getByText(content)).toHaveStyle({
      color: theme.colors.red,
    });
  });
  it('- should get weight prop', () => {
    renderWithProviders(<P weight="bold">{content}</P>);
    expect(screen.getByText(content)).toHaveStyle({
      'font-weight': theme.fontWeight.bold,
    });
  });
  it('- should get family prop', () => {
    renderWithProviders(<P family="main">{content}</P>);
    expect(screen.getByText(content)).toHaveStyle({
      'font-family': theme.fonts.main,
    });
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
