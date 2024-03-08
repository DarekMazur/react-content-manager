import { FC, ReactNode, useEffect, useRef } from 'react';
import { StyledPickerList } from './PickerList.styles.ts';

interface IPickerProps {
  children: ReactNode;
  isExpand: boolean;
  onClickOutside: () => void;
}

const PickerList: FC<IPickerProps> = ({
  children,
  isExpand,
  onClickOutside,
}) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement && !ref.current?.contains(e.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <StyledPickerList ref={ref} $expand={isExpand}>
      {children}
    </StyledPickerList>
  );
};

export default PickerList;
