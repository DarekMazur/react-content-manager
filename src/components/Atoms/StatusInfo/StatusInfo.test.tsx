import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import StatusInfo from './StatusInfo.tsx';
import { theme } from '../../../utils/themes/theme.ts';

const component = renderWithProviders(<StatusInfo status={true} />);

describe('Status Info component', () => {
  it('- should be round', () => {
    expect(screen.getByRole('info')).toHaveStyle('border-radius: 50%');
  });
  it('- falsy status should be blue', () => {
    renderWithProviders(<StatusInfo status={false} />);
    expect(screen.getByRole('info')).toHaveStyle(
      `background-color: ${theme.colors.brightBlue}`,
    );
  });
  it('- truthy status should be green', () => {
    renderWithProviders(<StatusInfo status={true} />);
    expect(screen.getByRole('info')).toHaveStyle(
      `background-color: ${theme.colors.green}`,
    );
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
