import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import ActionButton from './ActionButton.tsx';
import { theme } from '../../../utils/themes/theme.ts';

const component = renderWithProviders(
  <ActionButton handleClick={() => {}}>click</ActionButton>,
);

describe('Action Button component', () => {
  it('- should contains label', () => {
    expect(screen.getByText('click')).toBeInTheDocument();
  });
  it('- should have different version for delete', () => {
    renderWithProviders(
      <ActionButton isDel handleClick={() => {}}>
        click
      </ActionButton>,
    );
    expect(screen.getByRole('button')).toHaveStyle(
      `background-color: ${theme.colors.red}`,
    );
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
