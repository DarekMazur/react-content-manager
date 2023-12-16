import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PickerList from '../PickerList/PickerList.tsx';
import PickerListItem from '../../Atoms/PickerListItem/PickerListItem';
import { StyledEntriesPicker } from './EntriesNumberPicker.styles.ts';

const EntriesNumberPicker = () => {
  const [isExpand, setIsExpand] = useState(false);
  2;
  const [perPage, setPerPage] = useState(10);

  const handleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  const handleChoseEntriesNumber = (value: number) => {
    setIsExpand(false);
    setPerPage(value);
  };

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
        <PickerList isExpand={isExpand}>
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
      <span>articles per page</span>
    </StyledEntriesPicker>
  );
};

export default EntriesNumberPicker;
