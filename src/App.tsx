import React, { useState } from 'react';
import AppProviders from './utils/providers/AppProviders.tsx';
import Authorised from './components/Templates/Authorised/Authorised.tsx';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Unauthorised from './components/Templates/Unauthorised/Unauthorised.tsx';

const App = () => {
  // const [isAuthorised, setIsAuthorised] = useState(adminUser.role.type === 'admin');
  const [isAuthorised, setIsAuthorised] = useState(false);

  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setIsAuthorised(true);
  };

  return (
    <AppProviders>
      {isAuthorised ? (
        <Authorised />
      ) : (
        <Unauthorised handleMockLogin={handleMockLogin} />
      )}
      <FooterWrapper />
    </AppProviders>
  );
};

export default App;
