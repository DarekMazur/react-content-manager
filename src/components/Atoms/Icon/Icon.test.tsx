import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import { adminUser } from '../../../utils/data.ts';
import Icon from './Icon.tsx';

const component = renderWithProviders(<Icon />);

const componentWithAvt = renderWithProviders(
  <Icon customIcon={adminUser.avatar} />,
);

describe('Icon component:', () => {
  it('- render without custom icon prop display default icon', () => {
    expect(screen.getByLabelText(`${adminUser.username}`)).toBeInTheDocument();
  });
  it('- render default icon if url in prop is invalid', () => {
    renderWithProviders(<Icon customIcon={adminUser.uuid} />);
    expect(screen.getByLabelText(`${adminUser.username}`)).toBeInTheDocument();
  });

  it('- render user avatar as icon if get valid url in prop', () => {
    renderWithProviders(<Icon customIcon={adminUser.avatar} />);
    expect(
      screen.getByAltText(`${adminUser.username} avatar`),
    ).toBeInTheDocument();
  });
  it('- rendered default component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('- rendered component with custom icon match to snapshot', () => {
    expect(componentWithAvt).toMatchSnapshot();
  });
});
