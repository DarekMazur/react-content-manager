import { FC } from 'react';
import { StyledStatus } from './StatusInfo.styles.ts';

interface StatusProps {
  status: boolean;
}

const StatusInfo: FC<StatusProps> = ({ status }) => {
  return <StyledStatus $status={status} />;
};

export default StatusInfo;
