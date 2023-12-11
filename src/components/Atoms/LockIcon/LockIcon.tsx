import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledLockIcon } from './LockIcon.styles.ts';

const LockIcon = () => {
  return <StyledLockIcon as={FontAwesomeIcon} icon={['fas', 'lock']} />;
};

export default LockIcon;
