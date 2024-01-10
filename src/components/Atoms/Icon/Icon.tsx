import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIcon } from './Icon.styles.ts';
import { FC } from 'react';

interface IconProps {
  customIcon?: string;
  handleClick?: () => void;
}

const Icon: FC<IconProps> = ({ customIcon, handleClick }) => {
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;

  return (
    <StyledIcon onClick={handleClick}>
      {customIcon && imageUrlRegex.test(customIcon) ? (
        <img src={customIcon} alt={`avatar`} />
      ) : (
        <FontAwesomeIcon icon={['fas', 'user']} aria-label={`User icon`} />
      )}
    </StyledIcon>
  );
};

export default Icon;
