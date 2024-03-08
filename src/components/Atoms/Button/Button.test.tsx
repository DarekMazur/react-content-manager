import { screen } from '@testing-library/dom';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Button from './Button.tsx';
import { fireEvent } from '@testing-library/react';
import { theme } from '../../../utils/themes/theme.ts';

const component = renderWithProviders(<Button>Label</Button>);
describe('Button component', () => {
  it('- should contain label', () => {
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
  it('- should be button html element', () => {
    renderWithProviders(<Button>Label</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('- should have hover effect', () => {
    renderWithProviders(<Button>Label</Button>);
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyleRule('color', theme.colors.lightBlue, {
      modifier: ':hover',
    });
  });
  it('- should have click effect', () => {
    renderWithProviders(<Button>Label</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveStyleRule('box-shadow', 'unset', {
      modifier: ':active',
    });
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
