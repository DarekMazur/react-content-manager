import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIcon } from './Icon.styles.ts';

interface IconProps {
  customIcon?: string;
}

const Icon = (props: IconProps) => {
  const { customIcon } = props;
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;

  return (
    <StyledIcon>
      {customIcon && imageUrlRegex.test(customIcon) ? (
        <img src={customIcon} alt={`avatar`} />
      ) : (
        <FontAwesomeIcon icon={['fas', 'user']} aria-label={`User icon`} />
      )}
    </StyledIcon>
  );
};

export default Icon;
