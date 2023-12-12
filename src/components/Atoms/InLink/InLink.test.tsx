import { screen } from '@testing-library/dom';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import { faker } from '@faker-js/faker';
import InLink from './InLink.tsx';
import { fireEvent } from '@testing-library/react';
import { theme } from '../../../utils/themes/theme.ts';

const linkLabel = faker.lorem.words(2);
const component = renderWithProviders(<InLink target="/" name={linkLabel} />);

describe('Internal link component', () => {
  it('- should wrap name prop', () => {
    expect(screen.getByText(linkLabel)).toBeInTheDocument();
  });
  it('- should contains href attribute', () => {
    renderWithProviders(<InLink target="/" name={linkLabel} />);
    expect(screen.getByText(linkLabel)).toHaveAttribute('href', '/');
  });
  it('- should have ::after pseudo element', () => {
    renderWithProviders(<InLink target="/" name={linkLabel} />);
    const link = screen.getByText(linkLabel);
    fireEvent.mouseEnter(link);
    expect(link).toHaveStyleRule('background-color', theme.colors.red, {
      modifier: '::after',
    });
    expect(link).toHaveStyleRule('transform', 'scaleX(0)', {
      modifier: '::after',
    });
  });
  it('- should have hover effect', () => {
    renderWithProviders(<InLink target="/" name={linkLabel} />);
    const link = screen.getByText(linkLabel);
    fireEvent.mouseEnter(link);
    expect(link).toHaveStyleRule('color', theme.colors.red, {
      modifier: ':hover',
    });
    expect(link).toHaveStyleRule('transform', 'scaleX(1)', {
      modifier: ':hover::after',
    });
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
