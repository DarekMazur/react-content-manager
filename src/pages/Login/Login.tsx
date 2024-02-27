import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setUser, useGetUsersQuery } from '../../store';
import { useDispatch } from 'react-redux';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: users } = useGetUsersQuery();
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();

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
        console.log(res);
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('id', res.user.id);
        const loggedUser =
          users && users.find((user) => user.id === res.user.id);
        dispatch(setUser({ ...loggedUser, isAuthorised: true }));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setText('An error occurred, please see the developer console.');
      });
  }, [navigate, location.search, params.providerName]);

  return <p>{text}</p>;
};

export default Login;
