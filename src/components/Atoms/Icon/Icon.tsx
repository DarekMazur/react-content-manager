import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIcon } from './Icon.styles.ts';
import { FC } from 'react';

interface IIconProps {
  customIcon?: string;
  handleClick?: () => void;
}

const Icon: FC<IIconProps> = ({ customIcon, handleClick }) => {
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
