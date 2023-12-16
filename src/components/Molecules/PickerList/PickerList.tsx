import { FC, ReactNode } from 'react';
import { StyledPickerList } from './PickerList.styles.ts';

interface PickerProps {
  children: ReactNode;
  isExpand: boolean;
}

const PickerList: FC<PickerProps> = ({ children, isExpand }) => {
  return <StyledPickerList $expand={isExpand}>{children}</StyledPickerList>;
};

export default PickerList;
