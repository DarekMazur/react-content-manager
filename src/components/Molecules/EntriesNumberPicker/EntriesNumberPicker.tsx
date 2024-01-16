import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PickerList from '../PickerList/PickerList.tsx';
import PickerListItem from '../../Atoms/PickerListItem/PickerListItem';
import { StyledEntriesPicker } from './EntriesNumberPicker.styles.ts';
import { FC } from 'react';
import { useLocation } from 'react-router';

interface EntriesPickerProps {
  isExpand: boolean;
  perPage: number;
  handleExpand: () => void;
  // eslint-disable-next-line no-unused-vars
  handleChoseEntriesNumber: (value: number) => void;
  handleClose: () => void;
}

const EntriesNumberPicker: FC<EntriesPickerProps> = ({
  isExpand,
  perPage,
  handleExpand,
  handleChoseEntriesNumber,
  handleClose,
}) => {
  const location = useLocation();

  return (
    <StyledEntriesPicker>
      <div style={{ position: 'relative', width: '5rem' }}>
        <div role="select" onClick={handleExpand} style={{ cursor: 'pointer' }}>
          <span
            style={{
              display: 'inline-block',
              width: '3rem',
              textAlign: 'right',
              paddingRight: '1rem',
            }}
          >
            {perPage}
          </span>
          <span>
            <FontAwesomeIcon
              style={{ fontSize: '1.2rem' }}
              icon={['fas', 'chevron-down']}
            />
          </span>
        </div>
        <PickerList isExpand={isExpand} onClickOutside={handleClose}>
          {[10, 25, 50, 100].map((value) => (
            <PickerListItem
              key={value}
              value={value}
              perPage={perPage}
              onClick={() => handleChoseEntriesNumber(value)}
            />
          ))}
        </PickerList>
      </div>
      <span>{location.pathname.slice(1)} per page</span>
    </StyledEntriesPicker>
  );
};

export default EntriesNumberPicker;
