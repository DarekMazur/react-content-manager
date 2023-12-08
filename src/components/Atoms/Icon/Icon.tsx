import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIcon } from './Icon.styles.ts';

interface IconProps {
  customIcon?: string;
}

const Icon = (props: IconProps) => {
  const { customIcon } = props;
  return (
    <StyledIcon>
      {customIcon ? (
        <img src={customIcon} alt="" />
      ) : (
        <FontAwesomeIcon icon={['fas', 'user']} />
      )}
    </StyledIcon>
  );
};

export default Icon;
