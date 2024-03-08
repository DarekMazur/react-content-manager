import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Heading from './Heading.tsx';

const component = renderWithProviders(<Heading tag="h3">Heading</Heading>);

describe('Heading component', () => {
  it('- should contains label', () => {
    expect(screen.getByText('Heading')).toBeInTheDocument();
  });
  it('- should be html heading level declarative as tag', () => {
    renderWithProviders(<Heading tag="h3">Heading</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    renderWithProviders(<Heading tag="h2">Heading</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    renderWithProviders(<Heading tag="h1">Heading</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('- should be level 3 heading for wrong tag', () => {
    renderWithProviders(<Heading tag="div">Heading</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
  it('- should get optional styles', () => {
    renderWithProviders(
      <Heading tag="h3" align="center" size="l">
        Heading
      </Heading>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveStyle({
      'text-align': 'center',
      'font-size': `${16 * 2.4}px`,
    });
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
