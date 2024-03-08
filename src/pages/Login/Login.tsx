import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setUser, useUpdateUserMutation } from '../../store';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const [updateUser] = useUpdateUserMutation();
  const uuid = uuidv4();

  useEffect(() => {
    fetch(`${backendUrl}/api/auth/auth0/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('uuid', res.user.uuid ? res.user.uuid : uuid);

        fetch(`${import.meta.env.VITE_API_URL}users/me?populate=*`, {
          headers: {
            Authorization: `Bearer ${res.jwt}`,
          },
        })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error(
                `Couldn't login to Strapi. Status: ${res.status}`,
              );
            }
            return res;
          })
          .then((res) => res.json())
          .then((res) => {
            updateUser({ ...res, uuid: res.uuid ? res.uuid : uuid });
            dispatch(setUser({ ...res, uuid: res.uuid ? res.uuid : uuid }));
            navigate('/');
          });
      })
      .catch((err) => {
        console.error(err);
        setText('An error occurred, please see the developer console.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, params.providerName]);

  return <p>{text}</p>;
};

export default Login;
