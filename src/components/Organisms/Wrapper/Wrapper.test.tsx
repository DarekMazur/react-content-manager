import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import { faker } from '@faker-js/faker';
import Wrapper from './Wrapper.tsx';

const component = renderWithProviders(
  <Wrapper justify="center">
    <section>{faker.lorem.paragraphs({ min: 1, max: 3 })}</section>
    <section>{faker.lorem.paragraphs({ min: 1, max: 3 })}</section>
  </Wrapper>,
);

describe('', () => {
  it('- should get styles in props', () => {
    expect(screen.getByRole('wrapper')).toHaveStyle({
      'justify-content': 'center',
    });
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
