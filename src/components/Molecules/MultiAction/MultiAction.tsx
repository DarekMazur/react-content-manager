import { FC } from 'react';
import ActionButton from '../../Atoms/ActionButton/ActionButton.tsx';
import Wrapper from '../../Organisms/Wrapper/Wrapper.tsx';
import P from '../../Atoms/Paragraph/P.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  clearSelected,
  switchPopup,
  updateArticle,
} from '../../../store/index.ts';
import { getDate } from '../../../utils/methods/getDate.ts';
import { ArticleDataTypes } from '../../Organisms/Table/Table.tsx';

interface MultiActionProps {
  counter: number;
}

const MultiAction: FC<MultiActionProps> = ({ counter }) => {
  const selected = useSelector<RootState>((state) => state.selected);
  const isPopup = useSelector<RootState>((state) => state.popup);

  const dispach = useDispatch();

  const handlePublish = () => {
    const publication: ArticleDataTypes[] = [];
    (selected as ArticleDataTypes[]).forEach((article) => {
      article = {
        ...article,
        publishedAt: article.publishedAt
          ? article.publishedAt
          : getDate(new Date()),
        status: true,
      };
      publication.push(article);
    });
    dispach(clearSelected());
    dispach(updateArticle(publication));
  };

  const handleUnpublish = () => {
    const publication: ArticleDataTypes[] = [];
    (selected as ArticleDataTypes[]).forEach((article) => {
      article = {
        ...article,
        publishedAt: null,
        status: false,
      };
      publication.push(article);
    });
    dispach(clearSelected());
    dispach(updateArticle(publication));
  };

  const handleDelete = () => {
    dispach(switchPopup(!isPopup));
  };

  return (
    <Wrapper
      width="100%"
      justify="flex-start"
      align="center"
      padding="2rem 2.4vw"
    >
      <P weight="bold">
        {counter} article{counter > 1 ? 's' : null} selected{' '}
      </P>
      <ActionButton handleClick={handlePublish}>publish</ActionButton>{' '}
      <ActionButton handleClick={handleUnpublish}>unpublish</ActionButton>{' '}
      <ActionButton handleClick={handleDelete} isDel>
        delete
      </ActionButton>
    </Wrapper>
  );
};

export default MultiAction;
