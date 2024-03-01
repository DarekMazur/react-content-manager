import { useNavigate, useParams } from 'react-router';
import {
  RootState,
  switchPopup,
  useGetUserQuery,
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
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ICommentPopulated } from '../../../../types/commentTypes.ts';
import { IStrapiUser } from '../../../../types/userTypes.ts';
import userIcon from '../../../../assets/user.png';
import noUserIcon from '../../../../assets/noUserIcon.png';
import { Italic } from '../../../Atoms/Italic/Italic.styles.ts';
import FormErrorMessage from '../../../Atoms/FormErrorMessage/FormErrorMessage.tsx';

const CommentForm = ({
  currentComment,
}: {
  currentComment: ICommentPopulated;
}) => {
  const { t } = useTranslation();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const skip = !currentComment.attributes.author.data;
  // const skip = true;
  const [
    updateUser,
    { status: userStatus, isSuccess: userIsSuccess, isLoading: loadingUser },
  ] = useUpdateUserMutation();
  const [updateComment, { status, isSuccess, isLoading }] =
    useUpdateCommentMutation();
  const { data: commentAuthor } = useGetUserQuery(
    currentComment.attributes.author.data?.id,
    {
      skip,
    },
  );
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<IStrapiUser | undefined>(undefined);
  const [updatedComment, setUpdatedComment] =
    useState<ICommentPopulated>(currentComment);
  const [modal, setModal] = useState(false);
  const [updatedElement, setUpdatedElement] = useState<string | undefined>(
    undefined,
  );
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (commentAuthor) {
      setUserData(commentAuthor);
    }
  }, [commentAuthor]);

  useEffect(() => {
    if (isLoading || loadingUser) {
      setModal(true);
    }
  }, [isLoading, loadingUser]);

  useEffect(() => {
    if (
      updatedComment?.attributes.shadowed ===
        currentComment.attributes.shadowed &&
      userData?.blocked === commentAuthor?.blocked
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    commentAuthor?.blocked,
    currentComment.attributes.shadowed,
    updatedComment?.attributes.shadowed,
    userData?.blocked,
  ]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      console.log(userData);
      const updatedUser = {
        ...userData,
        blocked: (e.target as HTMLInputElement).checked,
      };
      setUserData(updatedUser as IStrapiUser);
    }
  };

  const handleOnShadow = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (currentComment) {
      const updatedCommentStatus = { ...currentComment.attributes };
      updatedCommentStatus.shadowed = (e.target as HTMLInputElement).checked;
      setUpdatedComment({
        id: currentComment.id,
        attributes: updatedCommentStatus,
      });
    }
  };

  const handleDelete = () => {
    dispatch(
      switchPopup({
        isOpen: true,
        ids: [(currentComment as ICommentPopulated).id],
        title: undefined,
      }),
    );
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) {
      return setErrorMessage(t('comment.form.message.noChanges'));
    }

    if (userData?.blocked !== commentAuthor?.blocked) {
      setUpdatedElement(t('modal.element.user'));
      const dataToUpdate = {
        id: userData?.id,
        username: userData?.username,
        avatar: userData?.avatar,
        email: userData?.email,
        confirmed: userData?.confirmed,
        blocked: userData?.blocked,
        role: userData?.role,
      };
      return updateUser(dataToUpdate);
    }

    setUpdatedElement(t('modal.element.comment'));

    updateComment({
      data: { id: updatedComment?.id, ...updatedComment?.attributes },
    });
  };

  const handleOnCancel = () => {
    if (commentAuthor) {
      setUserData(commentAuthor);
    }
    setUpdatedComment(currentComment);
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
      {updatedComment ? (
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
                    (currentComment as ICommentPopulated).attributes.createdAt,
                  )}
                </li>
                {(currentUser as IStrapiUser).role.type === 'administrator' ||
                (currentUser as IStrapiUser).role.type === 'redactor' ? (
                  <li>
                    {t('comment.form.details.status.title')}{' '}
                    {currentComment.attributes.shadowed ? (
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
                  value={
                    (updatedComment as ICommentPopulated).attributes.shadowed
                  }
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
                    userData
                      ? userData.avatar
                        ? userData.avatar.url
                        : userIcon
                      : noUserIcon
                  }
                  alt=""
                />
              </StyledImageControler>
              {userData ? (
                <>
                  <P>
                    <InLink
                      target={`/users/${userData.uuid}`}
                      name={userData.username}
                    ></InLink>
                  </P>
                  <P>
                    {t('comment.form.author.role')} {userData.role.name}
                  </P>
                  <P>
                    {t('comment.form.author.status.title')}{' '}
                    {commentAuthor?.blocked ? (
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
          <FormErrorMessage left={true} message={errorMessage} />
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
      ) : (
        'null'
      )}
    </>
  );
};

export default CommentForm;
