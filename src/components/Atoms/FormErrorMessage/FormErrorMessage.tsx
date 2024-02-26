import { StyledFormErrorMessage } from './FormErrorMessage.styles.ts';

const FormErrorMessage = ({
  message,
  left,
}: {
  message: string | null;
  left?: boolean;
}) => {
  return (
    <StyledFormErrorMessage $left={left}>{message}</StyledFormErrorMessage>
  );
};

export default FormErrorMessage;
