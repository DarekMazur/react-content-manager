import { useNavigate, useParams } from 'react-router';
import {
  switchPopup,
  useGetCommentsQuery,
  useGetUsersQuery,
  useUpdateCommentMutation,
  useUpdateUserMutation,
} from '../../../../store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import { ICommentData } from '../../../../types/commentTypes.ts';
import { IStrapiUser } from '../../../../types/userTypes.ts';
import userIcon from '../../../../assets/user.png';
import { Italic } from '../../../Atoms/Italic/Italic.styles.ts';

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
  const { data: comments } = useGetCommentsQuery();
  const { data: users } = useGetUsersQuery();

  const [userData, setUserData] = useState<IStrapiUser | undefined>(undefined);
  const [currentComment, setCurrentComment] = useState<
    ICommentData | undefined
  >(undefined);
  const [initialData, setInitialData] = useState({
    authorBlocked: false,
    commentShadowed: false,
  });
  const [modal, setModal] = useState(false);
  const [updatedElement, setUpdatedElement] = useState<string | undefined>(
    undefined,
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (comments && users) {
      setInitialData({
        authorBlocked: !!users.find(
          (user) =>
            user.uuid ===
            currentComment?.attributes.author.data.attributes.uuid,
        )?.blocked,
        commentShadowed: !!comments.data.find(
          (comment) => comment.attributes.uuid === uuid,
        )?.attributes.shadowed,
      });
      if (
        currentComment &&
        comments.data.filter(
          (comment) =>
            comment.attributes.uuid ===
            (currentComment as ICommentData).attributes.uuid,
        ).length === 0
      ) {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, comments, uuid]);

  useEffect(() => {
    if (currentComment && users && users.length > 0) {
      setUserData(users.find((user) => (user as IStrapiUser).id === 1));
    }
  }, [currentComment, users]);

  useEffect(() => {
    if (comments && comments.data.length > 0) {
      setCurrentComment(
        comments.data.find((comment) => comment.attributes.uuid === uuid),
      );
    }
  }, [comments, uuid]);

  useEffect(() => {
    if (isLoading || loadingUser) {
      setModal(true);
    }
  }, [isLoading, loadingUser]);

  useEffect(() => {
    if (
      currentComment?.attributes.shadowed === initialData.commentShadowed &&
      userData?.blocked === initialData.authorBlocked
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    currentComment?.attributes.shadowed,
    initialData.authorBlocked,
    initialData.commentShadowed,
    userData?.blocked,
  ]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updateUser: IStrapiUser = {
        ...currentComment.attributes.author.data.attributes,
        id: currentComment.attributes.author.data.id,
      };
      updateUser.blocked = (e.target as HTMLInputElement).checked;
      setUserData({ ...(updateUser as IStrapiUser) });
    }
  };

  const handleOnShadow = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updatedCommentStatus = { ...currentComment.attributes };
      updatedCommentStatus.shadowed = (e.target as HTMLInputElement).checked;
      setCurrentComment({
        id: currentComment.id,
        attributes: updatedCommentStatus,
      });
    }
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentComment as ICommentData).id],
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
    updateComment({
      data: { id: currentComment?.id, ...currentComment?.attributes },
    });
  };

  const handleOnCancel = () => {
    if ((currentComment as ICommentData).attributes.author.data) {
      setUserData(
        users &&
          users.find(
            (user) =>
              user.id ===
              (currentComment as ICommentData).attributes.author.data.id,
          ),
      );
    }
    setCurrentComment(
      comments!.data.find((comment) => comment.attributes.uuid === uuid),
    );
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
                  {currentComment?.attributes.article.data ? (
                    <>
                      {t('comment.form.details.article')}{' '}
                      <InLink
                        target={`/articles/${currentComment?.attributes.article.data.id}`}
                        name={
                          currentComment?.attributes.article.data.attributes
                            .title
                        }
                      ></InLink>
                    </>
                  ) : (
                    <Italic>Article is not longer available</Italic>
                  )}
                </li>
                <li>
                  {t('comment.form.details.publicationDate')}{' '}
                  {getDate(
                    (currentComment as ICommentData).attributes.createdAt,
                  )}
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
                <P>{currentComment?.attributes.body}</P>
                <FontAwesomeIcon icon={['fas', 'quote-right']} />
              </CommentContent>

              <FormWrapper $direction="column" $gap={0.4} $maxWidth={20}>
                <InputCheckbox
                  label={t('comment.form.details.shadowBan')}
                  id="blocked"
                  value={(currentComment as ICommentData).attributes.shadowed}
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
                <img
                  src={
                    currentComment?.attributes.author.data &&
                    currentComment?.attributes.author.data.attributes.avatar
                      ? currentComment?.attributes.author.data.attributes.avatar
                          .url
                      : userIcon
                  }
                  alt=""
                />
              </StyledImageControler>
              {currentComment?.attributes.author.data ? (
                <>
                  <P>
                    <InLink
                      target={`/users/${currentComment?.attributes.author.data.attributes.uuid}`}
                      name={
                        currentComment?.attributes.author.data.attributes
                          .username
                      }
                    ></InLink>
                  </P>
                  <P>
                    {t('comment.form.author.role')}{' '}
                    {
                      currentComment?.attributes.author.data.attributes.role
                        .name
                    }
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
                    value={(userData as IStrapiUser).blocked}
                    uuid={uuid}
                    handleOnChange={(e) => handleOnChange(e)}
                  />
                </>
              ) : (
                <P>
                  <Italic>{t('article.form.noAuthor')}</Italic>
                </P>
              )}
            </aside>
          </CommentFormWrapper>
          <FormButtonWrapper>
            <EditButtonsWrapper>
              <FormButton $type="submit" type="submit" disabled={disabled}>
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
