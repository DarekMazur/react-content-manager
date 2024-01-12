import { ChangeEvent, FC } from 'react';

interface ImageTypes {
  // eslint-disable-next-line no-unused-vars
  onFilesChange(file: File[]): void;
}

const ImageInput: FC<ImageTypes> = ({ onFilesChange }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      onFilesChange([...file]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <label htmlFor="avatar">Upload your picture:</label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageInput;
