import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIcon } from './Icon.styles.ts';
import { adminUser } from '../../../utils/data.ts';

interface IconProps {
  customIcon?: string;
}

const Icon = (props: IconProps) => {
  const { customIcon } = props;
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;

  return (
    <StyledIcon>
      {customIcon && imageUrlRegex.test(customIcon) ? (
        <img src={customIcon} alt={`${adminUser.username} avatar`} />
      ) : (
        <FontAwesomeIcon
          icon={['fas', 'user']}
          aria-label={`${adminUser.username}`}
        />
      )}
    </StyledIcon>
  );
};

export default Icon;
