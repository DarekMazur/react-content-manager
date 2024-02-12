import { useNavigate, useParams } from 'react-router';
import {
  switchPopup,
  useGetCommentsQuery,
  useGetUsersQuery,
  useUpdateCommentMutation,
  useUpdateUserMutation,
} from '../../../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ICommentTypes, IUserTypes } from '../../../../types/dataTypes.ts';
import Heading from '../../../Atoms/Heading/Heading.tsx';
import InLink from '../../../Atoms/InLink/InLink.tsx';
import { getDate } from '../../../../utils/methods/getDate.ts';
import {
  EditButtonsWrapper,
  FormButton,
  FormButtonWrapper,
  FormWrapper,
} from '../UserForm/UserForm.styles';
import P from '../../../Atoms/Paragraph/P.tsx';
import { StyledImageControler } from '../../../Molecules/ImageControler/ImageControler.styles.ts';
import InputCheckbox from '../../../Molecules/InputCheckbox/InputCheckbox.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CommentContent,
  CommentDetailList,
  CommentDetails,
  CommentFormWrapper,
  CommentStatus,
  StyledCommentForm,
} from './CommentForm.styles.ts';
import Modal from '../../Modal/Modal.tsx';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CommentForm = () => {
  const { t } = useTranslation();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    updateUser,
    { status: userStatus, isSuccess: userIsSuccess, isLoading: loadingUser },
  ] = useUpdateUserMutation();
  const [updateComment, { status, isSuccess, isLoading }] =
    useUpdateCommentMutation();
  const { data: comments = [] } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();

  const [userData, setUserData] = useState<IUserTypes | undefined>(undefined);
  const [currentComment, setCurrentComment] = useState<
    ICommentTypes | undefined
  >(undefined);
  const [initialData, setInitialData] = useState({
    authorBlocked: false,
    commentShadowed: false,
  });
  const [modal, setModal] = useState(false);
  const [updatedElement, setUpdatedElement] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setInitialData({
      authorBlocked: !!users.find(
        (user) => user.uuid === currentComment?.author.uuid,
      )?.blocked,
      commentShadowed: !!comments.find((comment) => comment.uuid === uuid)
        ?.shadowed,
    });
    if (
      currentComment &&
      comments.filter(
        (comment) => comment.uuid === (currentComment as ICommentTypes).uuid,
      ).length === 0
    ) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, comments, uuid]);

  useEffect(() => {
    if (currentComment && users.length > 0) {
      setUserData(
        users.find(
          (user) => (user as IUserTypes).uuid === currentComment.author.uuid,
        ),
      );
    }
  }, [currentComment, users]);

  useEffect(() => {
    if (comments.length > 0) {
      setCurrentComment(comments.find((comment) => comment.uuid === uuid));
    }
  }, [comments, uuid]);

  useEffect(() => {
    if (isLoading || loadingUser) {
      setModal(true);
    }
  }, [isLoading, loadingUser]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updateUser: IUserTypes = { ...currentComment.author };
      updateUser.blocked = (e.target as HTMLInputElement).checked;
      setUserData({ ...(updateUser as IUserTypes) });
    }
  };

  const handleOnShadow = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updatedComment = { ...currentComment };
      updatedComment.shadowed = (e.target as HTMLInputElement).checked;
      setCurrentComment({ ...(updatedComment as ICommentTypes) });
    }
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentComment as ICommentTypes).id],
        title: undefined,
      }),
    );
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData?.blocked !== initialData.authorBlocked) {
      setUpdatedElement(t('modal.element.user'));
      return updateUser(userData);
    }
    setUpdatedElement(t('modal.element.comment'));
    updateComment(currentComment);
  };

  const handleOnCancel = () => {
    setUserData(
      users.find(
        (user) => user.uuid === (currentComment as ICommentTypes).author.uuid,
      ),
    );
    setCurrentComment(comments.find((comment) => comment.uuid === uuid));
    navigate(-1);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {modal && updatedElement ? (
        <Modal
          isSuccess={isSuccess || userIsSuccess}
          isError={status === 'rejected' || userStatus === 'rejected'}
          handleCloseModal={handleCloseModal}
          dataType={updatedElement}
        />
      ) : null}
      {currentComment && userData ? (
        <StyledCommentForm
          onSubmit={handleOnSubmit}
          style={{ width: '80vw', margin: 'auto' }}
        >
          <Heading tag="h2" align="center" size="l" padding="2rem 0 4rem">
            {t('comment.form.header', { id: currentComment.id })}
          </Heading>
          <CommentFormWrapper>
            <CommentDetails>
              <P size="lm" weight="bold">
                {t('comment.form.details.header')}
              </P>
              <CommentDetailList>
                <li>
                  {t('comment.form.details.article')}{' '}
                  <InLink
                    target={`/articles/${currentComment?.article.id}`}
                    name={currentComment?.article.title}
                  ></InLink>
                </li>
                <li>
                  {t('comment.form.details.publicationDate')}{' '}
                  {getDate((currentComment as ICommentTypes).publishedAt)}
                </li>
                {userData.role.id !== 3 ? (
                  <li>
                    {t('comment.form.details.status.title')}{' '}
                    {initialData.commentShadowed ? (
                      <CommentStatus $isRed>
                        {t('comment.form.details.status.shadowed')}
                      </CommentStatus>
                    ) : (
                      <CommentStatus>
                        {t('comment.form.details.status.visible')}
                      </CommentStatus>
                    )}
                  </li>
                ) : null}
              </CommentDetailList>
              <CommentContent>
                <FontAwesomeIcon icon={['fas', 'quote-left']} />
                <P>{currentComment?.content}</P>
                <FontAwesomeIcon icon={['fas', 'quote-right']} />
              </CommentContent>

              <FormWrapper $direction="column" $gap={0.4} $maxWidth={20}>
                <InputCheckbox
                  label={t('comment.form.details.shadowBan')}
                  id="blocked"
                  value={(currentComment as ICommentTypes).shadowed}
                  uuid={uuid}
                  handleOnChange={(e) => handleOnShadow(e)}
                />
              </FormWrapper>
            </CommentDetails>
            <aside>
              <P size="lm" weight="bold">
                {t('comment.form.author.title')}
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
              <P>
                {t('comment.form.author.role')}{' '}
                {currentComment?.author.role.name}
              </P>
              <P>
                {t('comment.form.author.status.title')}{' '}
                {initialData.authorBlocked ? (
                  <CommentStatus $isRed>
                    {t('comment.form.author.status.blocked')}
                  </CommentStatus>
                ) : userData.confirmed ? (
                  <CommentStatus>
                    {t('comment.form.author.status.active')}
                  </CommentStatus>
                ) : (
                  <CommentStatus $isYellow>
                    {t('comment.form.author.status.notActive')}
                  </CommentStatus>
                )}
              </P>
              <InputCheckbox
                label={t('comment.form.author.blocked')}
                id="blocked"
                value={(userData as IUserTypes).blocked}
                uuid={uuid}
                handleOnChange={(e) => handleOnChange(e)}
              />
            </aside>
          </CommentFormWrapper>
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <FormButton $type="submit" type="submit">
                <FontAwesomeIcon icon={['fas', 'edit']} />{' '}
                {t('form.saveButton')}
              </FormButton>
              <FormButton $type="reset" type="reset" onClick={handleOnCancel}>
                <FontAwesomeIcon icon={['fas', 'xmark']} />{' '}
                {t('form.cancelButton')}
              </FormButton>
            </EditButtonsWrapper>
            <FormButton $type="delete" type="button" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'trash']} />{' '}
              {t('form.deleteButton')}
            </FormButton>
          </FormButtonWrapper>
        </StyledCommentForm>
      ) : null}
    </>
  );
};

export default CommentForm;
