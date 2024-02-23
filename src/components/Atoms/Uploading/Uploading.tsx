import {
  StyledUploader,
  UploaderElement,
  UploadingWrapper,
} from './Uploading.styles.ts';

const Uploading = () => {
  return (
    <UploadingWrapper>
      <StyledUploader>
        <UploaderElement />
        <UploaderElement />
        <UploaderElement />
        <UploaderElement />
      </StyledUploader>
    </UploadingWrapper>
  );
};

export default Uploading;
