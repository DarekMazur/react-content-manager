import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
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
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('id', res.user.uuid);
        console.log(res.user);
        setText(
          'You have been successfully logged in. You will be redirected in a few seconds...',
        );
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((err) => {
        console.log(err);
        setText('An error occurred, please see the developer console.');
      });
  }, [navigate, location.search, params.providerName]);

  return <p>{text}</p>;
};

export default Login;
