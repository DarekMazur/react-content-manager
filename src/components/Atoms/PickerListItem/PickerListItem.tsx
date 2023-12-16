import { FC } from 'react';
import { StyledPickerListItem } from './PickerListItem.styles.ts';

interface PickerItemProps {
  value: number;
  perPage: number;
  onClick: () => void;
}

const PickerListItem: FC<PickerItemProps> = ({ value, perPage, onClick }) => {
  return (
    <StyledPickerListItem
      key={value}
      role="option"
      onClick={onClick}
      $value={value}
      $perPage={perPage}
    >
      {value}
    </StyledPickerListItem>
  );
};

export default PickerListItem;
