import { useNavigate, useParams } from 'react-router';
import {
  useGetCommentsQuery,
  useGetUsersQuery,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
  useUpdateUserMutation,
} from '../../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CommentTypes, UserTypes } from '../../../types/dataTypes';
import Heading from '../../Atoms/Heading/Heading';
import InLink from '../../Atoms/InLink/InLink';
import { getDate } from '../../../utils/methods/getDate';
import {
  FormButton,
  FormButtonWrapper,
  FormWrapper,
} from '../UserForm/UserForm.styles';
import { StyledInputSelect } from '../../Molecules/InputSelect/InputSelect.styles';
import P from '../../Atoms/Paragraph/P';
import { StyledImageControler } from '../../Molecules/UserImageControler/UserImageControler.styles';
import InputCheckbox from '../../Molecules/InputCheckbox/InputCheckbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentForm = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [removeComment] = useRemoveCommentMutation();
  const { data: comments = [] } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();

  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const [currentComment, setCurrentComment] = useState<
    CommentTypes | undefined
  >(undefined);
  const [toDelete, setToDelete] = useState(false);
  const [initialData, setInitialData] = useState({
    authorBlocked: false,
    commentShadowed: false,
  });

  useEffect(() => {
    setInitialData({
      authorBlocked: !!users.find(
        (user) => user.uuid === currentComment?.author.uuid,
      )?.blocked,
      commentShadowed: !!comments.find((comment) => comment.uuid === uuid)
        ?.shadowed,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, comments, uuid]);

  useEffect(() => {
    if (currentComment && users.length > 0) {
      setUserData(
        users.find(
          (user) => (user as UserTypes).uuid === currentComment.author.uuid,
        ),
      );
    }
  }, [currentComment, users]);

  useEffect(() => {
    if (comments.length > 0) {
      setCurrentComment(comments.find((comment) => comment.uuid === uuid));
    }
  }, [comments, uuid]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updateUser: UserTypes = { ...currentComment.author };
      updateUser.blocked = (e.target as HTMLInputElement).checked;
      setUserData({ ...(updateUser as UserTypes) });
    }
  };

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const upadtedComment = { ...currentComment };
    if (e.target.value === 'default') {
      upadtedComment.shadowed = comments.find(
        (comment) => comment.uuid === uuid,
      )?.shadowed;
    } else {
      switch (e.target.value) {
        case 'shadow':
          upadtedComment.shadowed = true;
          setToDelete(false);
          break;
        case 'turnon':
          upadtedComment.shadowed = false;
          setToDelete(false);
          break;
        case 'delete':
          setToDelete(true);
          break;
        default:
          setToDelete(false);
      }
    }
    setCurrentComment({ ...(upadtedComment as CommentTypes) });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toDelete) {
      removeComment([currentComment?.id]);
      navigate(-1);
    }
    console.log('Submit');
    updateUser(userData);
    updateComment(currentComment);
  };

  const handleOnCancel = () => {
    console.log('Cancel');
    setUserData(
      users.find(
        (user) => user.uuid === (currentComment as CommentTypes).author.uuid,
      ),
    );
    setCurrentComment(comments.find((comment) => comment.uuid === uuid));
    navigate(-1);
  };

  return (
    <>
      {currentComment && userData ? (
        <form onSubmit={handleOnSubmit}>
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            Comment #{currentComment.id}
          </Heading>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4rem',
            }}
          >
            <div style={{ maxWidth: '70vw' }}>
              <P size="lm" weight="bold">
                Comment's details
              </P>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li>
                  Article:{' '}
                  <InLink
                    target={`/articles/${currentComment?.article.id}`}
                    name={currentComment?.article.title}
                  ></InLink>
                </li>
                <li>
                  Publication date:{' '}
                  {getDate((currentComment as CommentTypes).publishedAt)}
                </li>
                <li>
                  {initialData.commentShadowed ? (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      SHADOW BANNED
                    </span>
                  ) : (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                      Visible for everyone
                    </span>
                  )}
                </li>
              </ul>
              <p>{currentComment?.content}</p>
              <FormWrapper $direction="column" $gap={0.4} $maxWidth={20}>
                <label htmlFor="commentAction">Action</label>
                <StyledInputSelect
                  name="commentAction"
                  id="commentAction"
                  defaultValue="default"
                  onChange={handleOnSelect}
                >
                  <option value="default" key="default">
                    --choose action--
                  </option>
                  {initialData.commentShadowed ? (
                    <option value="turnon">turn on</option>
                  ) : (
                    <option value="shadow">shadow</option>
                  )}
                  <option value="delete">delete</option>
                </StyledInputSelect>
              </FormWrapper>
            </div>
            <aside>
              <P size="lm" weight="bold">
                Comment's author
              </P>
              <StyledImageControler>
                <img src={currentComment?.author.avatar} alt="" />
              </StyledImageControler>
              <P>
                <InLink
                  target={`/users/${currentComment?.author.uuid}`}
                  name={currentComment?.author.username}
                ></InLink>
              </P>
              <P>Role: {currentComment?.author.role.name}</P>
              <P>
                Status:{' '}
                {initialData.authorBlocked ? (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    BLOCKED
                  </span>
                ) : userData.confirmed ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                    ACTIVE
                  </span>
                ) : (
                  <span style={{ color: 'gold', fontWeight: 'bold' }}>
                    NOT ACTIVATED
                  </span>
                )}
              </P>
              <InputCheckbox
                label="Blocked:"
                id="blocked"
                value={(userData as UserTypes).blocked}
                uuid={uuid}
                handleOnChange={(e) => handleOnChange(e)}
              />
            </aside>
          </div>
          <FormButtonWrapper>
            <FormButton $type="submit" type="submit">
              <FontAwesomeIcon icon={['fas', 'edit']} /> Save
            </FormButton>
            <FormButton $type="reset" type="reset" onClick={handleOnCancel}>
              <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
            </FormButton>
          </FormButtonWrapper>
        </form>
      ) : null}
    </>
  );
};

export default CommentForm;