import { FC } from 'react';
import ActionButton from '../../Atoms/ActionButton/ActionButton.tsx';
import Wrapper from '../../Organisms/Wrapper/Wrapper.tsx';

interface MultiActionProps {
  counter: number;
}

const MultiAction: FC<MultiActionProps> = ({ counter }) => {
  return (
    <Wrapper
      width="100%"
      justify="flex-start"
      align="center"
      padding="2rem 2.4vw"
    >
      {counter} article{counter > 1 ? 's' : null} selected{' '}
      <ActionButton>publish</ActionButton>{' '}
      <ActionButton>unpublish</ActionButton>{' '}
      <ActionButton isDel>delete</ActionButton>
    </Wrapper>
  );
};

export default MultiAction;
