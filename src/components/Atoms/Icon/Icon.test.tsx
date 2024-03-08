import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import Icon from './Icon.tsx';
import { faker } from '@faker-js/faker';

const component = renderWithProviders(<Icon />);

const componentWithAvt = renderWithProviders(
  <Icon customIcon={faker.internet.avatar()} />,
);

describe('Icon component:', () => {
  it('- render without custom icon prop display default icon', () => {
    expect(screen.getByLabelText(`User icon`)).toBeInTheDocument();
  });
  it('- render default icon if url in prop is invalid', () => {
    renderWithProviders(<Icon customIcon={faker.string.uuid()} />);
    expect(screen.getByLabelText(`User icon`)).toBeInTheDocument();
  });

  it('- render user avatar as icon if get valid url in prop', () => {
    renderWithProviders(<Icon customIcon={faker.internet.avatar()} />);
    expect(screen.getByAltText(`avatar`)).toBeInTheDocument();
  });
  it('- rendered default component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('- rendered component with custom icon match to snapshot', () => {
    expect(componentWithAvt).toMatchSnapshot();
  });
});
