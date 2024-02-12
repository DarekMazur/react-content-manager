import { FC } from 'react';
import { StyledStatus } from './StatusInfo.styles.ts';
import { useLocation } from 'react-router';

interface IStatusProps {
  status: boolean;
}

const StatusInfo: FC<IStatusProps> = ({ status }) => {
  const location = useLocation();

  return (
    <StyledStatus
      role="info"
      $status={status}
      $isRed={location.pathname === '/comments'}
    />
  );
};

export default StatusInfo;
