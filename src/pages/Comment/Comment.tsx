import { useParams } from 'react-router';
import { RootState, useGetCommentsQuery, useGetUsersQuery } from '../../store';
import { Loading } from '../../components/Atoms/Loading/Loading.styles';
import { ChangeEvent, useEffect, useState } from 'react';
import { CommentTypes, UserTypes } from '../../types/dataTypes';
import { useSelector } from 'react-redux';
import {
  FormButton,
  FormButtonWrapper,
} from '../../components/Organisms/UserForm/UserForm.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDate } from '../../utils/methods/getDate';
import InLink from '../../components/Atoms/InLink/InLink';
import P from '../../components/Atoms/Paragraph/P';
import { getFooterHeight } from '../../utils/methods/getFooterHeight';
import Heading from '../../components/Atoms/Heading/Heading';
import InputCheckbox from '../../components/Molecules/InputCheckbox/InputCheckbox';
import { StyledImageControler } from '../../components/Molecules/UserImageControler/UserImageControler.styles';

const CommentView = () => {
  const { uuid } = useParams();
  const { data: comments = [], isLoading } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [currentComment, setCurrentComment] = useState<
    CommentTypes | undefined
  >(undefined);

  useEffect(() => {
    setWrapperHeight(getFooterHeight() + 50);
  }, []);

  useEffect(() => {
    if (currentComment && users.length > 0) {
      setUserData(
        users.find((user) => user.uuid === currentComment.author.uuid),
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

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <main
      style={{
        paddingBottom: '11rem',
        minHeight: `calc(100vh - ${wrapperHeight}px)`,
      }}
    >
      {currentComment && userData ? (
        (currentUser as UserTypes).uuid === uuid ||
        (currentUser as UserTypes).role.type === 'admin' ||
        (currentUser as UserTypes).role.type === 'redactor' ? (
          <>
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
                    {currentComment.shadowed
                      ? 'SHADOW BANNED'
                      : 'Visible for everyone'}
                  </li>
                </ul>
                <p>{currentComment?.content}</p>
                <label htmlFor="commentAction">Action</label>
                <select
                  name="commentAction"
                  id="commentAction"
                  defaultValue="default"
                >
                  <option value="default" key="default">
                    --choose action--
                  </option>
                  <option value="shadow">shadow</option>
                  <option value="delete">delete</option>
                </select>
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
                  {userData.blocked ? (
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
              <FormButton $type="reset" type="reset">
                <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
              </FormButton>
            </FormButtonWrapper>
          </>
        ) : (
          "You're not authorised"
        )
      ) : null}
    </main>
  );
};

export default CommentView;
