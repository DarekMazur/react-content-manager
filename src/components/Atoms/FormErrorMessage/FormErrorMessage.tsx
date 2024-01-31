import { StyledFormErrorMessage } from './FormErrorMessage.styles.ts';

const FormErrorMessage = ({ message }: { message: string | null }) => {
  return <StyledFormErrorMessage>{message}</StyledFormErrorMessage>;
};

export default FormErrorMessage;
