import { FC } from 'react';
import { StyledPickerListItem } from './PickerListItem.styles.ts';

interface IPickerItemProps {
  value: number;
  perPage: number;
  onClick: () => void;
}

const PickerListItem: FC<IPickerItemProps> = ({ value, perPage, onClick }) => {
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
