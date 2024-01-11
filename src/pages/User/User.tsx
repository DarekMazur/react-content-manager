import { useParams } from 'react-router-dom';
import { RootState, setUser, useGetUsersQuery, useUpdateUserMutation } from '../../store';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { UserTypes } from '../../types/dataTypes';
import { roles } from '../../mocks/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

interface InputTypes {
  label: string; 
  type: string; 
  id: string; 
  value: string | boolean; 
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e:ChangeEvent<HTMLInputElement>) => void;
}

const Input:FC<InputTypes> = ({label, type, id, value, handleOnChange}) => {
  return(
    <div>
      <label htmlFor="username">{label}</label>
      <input type={type} value={typeof value === 'string' ? value : 'undefined'} checked={value as boolean} id={id} onChange={e => handleOnChange(e)} />
    </div>
  )
}

interface ImageTypes {
  // eslint-disable-next-line no-unused-vars
  onFilesChange(file: File[]): void;
}

const ImageInput:FC<ImageTypes> = ({ onFilesChange }) => {
  const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      onFilesChange([...file])
    }
  }

  return(
    <div>
      <label htmlFor="avatar">Upload your picture:</label>
      <input type='file' id='avatar' accept="image/*" onChange={handleImageChange} />
    </div>
  )
}

const UserView = () => {
  const { uuid } = useParams();
  const { data: users = [] } = useGetUsersQuery();
  const currentUser = useSelector<RootState>((state) => state.user);

  const [userData, setUserData] = useState<UserTypes | undefined>(undefined);
	const [updateUser] = useUpdateUserMutation()
  const dispatch = useDispatch()

  const [image, setImage] = useState<File[]>([])
  const [imageUrl, setImageUrl] =useState<string | undefined>(undefined)

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
  }, [image])

  useEffect(() => {
    if (imageUrl && userData) {
      const updateUser: UserTypes = {...userData}
      updateUser.avatar = imageUrl
      setUserData({...(updateUser as UserTypes)})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl])
  

  useEffect(() => {
    setUserData(users.find((user) => user.uuid === uuid) as UserTypes);
  }, [users, uuid]);

  const handleOnChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldType: keyof UserTypes) => {
    if (userData) {
      const updateUser: UserTypes = {...userData}
      if (fieldType === "role") {
        const newRole = roles.find(role => role.name === e.target.value)
        updateUser[fieldType] = newRole || userData?.role
        setUserData({...(updateUser as UserTypes)})
      } else {
        updateUser[fieldType] = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
        setUserData({...(updateUser as UserTypes)})
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateUser({...userData})
    if (userData && userData.uuid === (currentUser as UserTypes).uuid) {
      dispatch(setUser({ ...userData, isAuthorised: true }));
    }
  }

  return (
    <>
      {userData ? (
        <form onSubmit={handleSubmit}>  
          <div>
            <img
              src={image.length === 0 ? userData.avatar : imageUrl}
              alt={`${userData.username} avatar`}
              style={{ width: '15rem' }}
            />
          </div>
          <ImageInput onFilesChange={(selectedFilies) => setImage(selectedFilies)} />
          <Input label='Name:' type='text' id='username' value={userData.username} handleOnChange={e => handleOnChange(e, 'username')} />
          <Input label='Email:' type='email' id='email' value={userData.email} handleOnChange={e => handleOnChange(e, 'email')} />
          <Input label='Confirmed:' type='checkbox' id='confirmed' value={userData.confirmed} handleOnChange={e => handleOnChange(e, 'confirmed')} />
          <Input label='Blocked:' type='checkbox' id='blocked' value={userData.blocked} handleOnChange={e => handleOnChange(e, 'blocked')} />
          <div>
            <label htmlFor="role">Role: </label>
            <select name="role" id="role" value={userData.role.name} onChange={e => handleOnChange(e, "role")} >
              <option value="Administrator">
                Administrator
              </option>
              <option value="Redactor">Redactor</option>
              <option value="Creator">Creator</option>
              <option value="Authenticated">Authenticated</option>
            </select>
          </div>
          <button type="submit"><FontAwesomeIcon icon={['fas', 'edit']} /> Edit</button>
        </form>
      ) : null}
    </>
  );
};

export default UserView;
