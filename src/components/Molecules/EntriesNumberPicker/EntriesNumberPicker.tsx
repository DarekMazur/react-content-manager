import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../../utils/themes/theme';

const EntriesNumberPicker = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const handleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  const handleChoseEntriesNumber = (value: number) => {
    setIsExpand(false);
    setPerPage(value);
  };

  return (
    <div style={{ margin: '1rem 2.5vw', display: 'flex', gap: '1rem' }}>
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
        <ul
          style={{
            listStyle: 'none',
            display: isExpand ? 'block' : 'none',
            position: 'absolute',
            left: 0,
            top: '1rem',
            padding: 0,
            width: '5rem',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {[10, 25, 50, 100].map((value) => (
            <li
              key={value}
              role="option"
              style={{
                padding: '0.3rem 0',
                color:
                  perPage === value ? theme.colors.darkBlue : theme.colors.blue,
              }}
              onClick={() => handleChoseEntriesNumber(value)}
              value={value}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
      <span>articles per page</span>
    </div>
  );
};

export default EntriesNumberPicker;
