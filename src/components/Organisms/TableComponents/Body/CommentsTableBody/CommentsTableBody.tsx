import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  RootState,
  addCommentSelected,
  removeCommentSelected,
} from '../../../../../store';
import Checkbox from '../../../../Molecules/Checkbox/Checkbox';
import { getDate } from '../../../../../utils/methods/getDate';
import TableActionIcons from '../../../../Molecules/TableActionIcons/TableActionIcons';
import StatusInfo from '../../../../Atoms/StatusInfo/StatusInfo';
import { ICommentData } from '../../../../../types/commentTypes.ts';
import { IUserData } from '../../../../../types/userTypes.ts';

const CommentsTableBody = ({ data }: { data: ICommentData[] }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState>((state) => state.user);

  const selectedComments = useSelector<RootState>(
    (state) => state.selectedComments,
  );

  const [checkedComments, setCheckedComments] = useState<ICommentData[]>(
    selectedComments as ICommentData[],
  );

  useEffect(() => {
    setCheckedComments(selectedComments as ICommentData[]);
  }, [selectedComments]);

  const handleClickSelect = (uuid: string) => {
    const checkedElement = data.find(
      (comment) => comment.attributes.uuid === uuid,
    );
    if (
      checkedElement &&
      checkedComments.includes(checkedElement as ICommentData)
    ) {
      dispatch(removeCommentSelected(checkedElement));
      setCheckedComments(
        checkedComments.filter((article) => article.attributes.uuid !== uuid),
      );
    } else if (checkedElement) {
      dispatch(addCommentSelected(checkedElement));
      setCheckedComments((prevState) => [
        ...prevState,
        checkedElement as ICommentData,
      ]);
    }
  };

  return (
    <>
      {data.map((comment) => (
        <tr key={comment.attributes.uuid}>
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
              uuid={comment.attributes.uuid}
              isChecked={Array.from(checkedComments as ICommentData[]).includes(
                comment,
              )}
            />
          </td>
          <td>{comment.id}</td>
          <td
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1rem',
            }}
          >
            <StatusInfo
              status={
                (currentUser as IUserData).role.id === 3 ||
                ((currentUser as IUserData).role.id === 2 &&
                  (currentUser as IUserData).uuid ===
                    comment.attributes.author.data.attributes.uuid)
                  ? true
                  : !comment.attributes.shadowed
              }
            />
          </td>
          <td style={{ textAlign: 'left' }}>
            {comment.attributes.author.data ? (
              comment.attributes.author.data.attributes.username
            ) : (
              <i>Author is no longer available</i>
            )}
          </td>
          <td style={{ textAlign: 'left' }}>
            {comment.attributes.article.data ? (
              comment.attributes.article.data.attributes.title
            ) : (
              <i>Commented article removed</i>
            )}
          </td>
          <td style={{ textAlign: 'left' }}>
            {comment.attributes.body.length > 50
              ? `${comment.attributes.body.slice(0, 50)}[...]`
              : comment.attributes.body}
          </td>
          <td>
            {comment.attributes.createdAt
              ? getDate(comment.attributes.createdAt)
              : '-'}
          </td>
          <td style={{ textAlign: 'left' }}>
            <TableActionIcons id={comment.id} uuid={comment.attributes.uuid} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CommentsTableBody;
