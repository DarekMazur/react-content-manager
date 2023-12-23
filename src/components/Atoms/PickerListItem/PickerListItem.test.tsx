import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { renderWithProviders } from '../../../utils/providers/renderWithProviders.tsx';
import PickerListItem from './PickerListItem.tsx';
import { theme } from '../../../utils/themes/theme.ts';

const component = renderWithProviders(
  <PickerListItem value={10} perPage={10} onClick={() => {}} />,
);

describe('Picker List Item component', () => {
  it('- should have label with value', () => {
    expect(screen.getByText('10')).toBeInTheDocument();
  });
  it('- should have default style for element not equal to perPage value', () => {
    renderWithProviders(
      <PickerListItem value={10} perPage={25} onClick={() => {}} />,
    );
    expect(screen.getByRole('option')).toHaveStyle(
      `color: ${theme.colors.blue}`,
    );
  });
  it('- should have style for element equal to perPage value', () => {
    renderWithProviders(
      <PickerListItem value={10} perPage={10} onClick={() => {}} />,
    );
    expect(screen.getByRole('option')).toHaveStyle(
      `color: ${theme.colors.darkBlue}`,
    );
  });
  it('- should have hover effect', () => {
    renderWithProviders(
      <PickerListItem value={10} perPage={10} onClick={() => {}} />,
    );
    fireEvent.mouseEnter(screen.getByRole('option'));
    expect(screen.getByRole('option')).toHaveStyleRule(
      'background-color',
      theme.colors.lightBlue,
      {
        modifier: ':hover',
      },
    );
  });
  it('- rendered component match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
