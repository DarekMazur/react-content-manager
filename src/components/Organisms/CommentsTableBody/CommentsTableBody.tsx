import { useDispatch, useSelector } from 'react-redux';
import { CommentTypes } from '../../../types/dataTypes';
import { useEffect, useState } from 'react';
import {
  RootState,
  addCommentSelected,
  removeCommentSelected,
} from '../../../store';
import Checkbox from '../../Molecules/Checkbox/Checkbox';
import { getDate } from '../../../utils/methods/getDate';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons';

const CommentsTableBody = ({ data }: { data: CommentTypes[] }) => {
  const dispatch = useDispatch();

  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );

  const [checkedComments, setCheckedComments] = useState<CommentTypes[]>(
    selectedComments as CommentTypes[],
  );

  useEffect(() => {
    setCheckedComments(selectedComments as CommentTypes[]);
  }, [selectedComments]);

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find((comment) => comment.uuid === uuid);
    if (
      checkedElement &&
      checkedComments.includes(checkedElement as CommentTypes)
    ) {
      dispatch(removeCommentSelected(checkedElement));
      setCheckedComments(
        checkedComments.filter((article) => article.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addCommentSelected(checkedElement));
      setCheckedComments((prevState) => [
        ...prevState,
        checkedElement as CommentTypes,
      ]);
    }
  };

  return (
    <>
      {data.map((comment) => (
        <tr key={comment.uuid}>
          <td
            style={{
              height: '6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Checkbox
              handleClick={handleClickSelect}
              uuid={comment.uuid}
              isChecked={Array.from(checkedComments as CommentTypes[]).includes(
                comment,
              )}
            />
          </td>
          <td>{comment.id}</td>
          <td style={{ textAlign: 'left' }}>{comment.author.username}</td>
          <td style={{ textAlign: 'left' }}>{comment.article.title}</td>
          <td style={{ textAlign: 'left' }}>
            {comment.content.length > 50
              ? `${comment.content.slice(0, 50)}[...]`
              : comment.content}
          </td>
          <td>{comment.publishedAt ? getDate(comment.publishedAt) : '-'}</td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons id={comment.id} uuid={comment.uuid} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CommentsTableBody;
