import React, { useEffect, useState } from 'react';
import { getFooterHeight } from './utils/methods/getFooterHeight.ts';
import AppProviders from './utils/providers/AppProviders.tsx';
import Authorised from './components/Templates/Authorised/Authorised.tsx';
import FooterWrapper from './components/Organisms/Footer/Footer.tsx';
import Unauthorised from './components/Templates/Unauthorised/Unauthorised.tsx';

const App = () => {
  // const [isAuthorised, setIsAuthorised] = useState(adminUser.role.type === 'admin');
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  const handleMockLogin = (e?: React.ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setIsAuthorised(true);
  };

  useEffect(() => {
    setWrapperHeight(getFooterHeight());
  }, []);

  return (
    <AppProviders>
      {isAuthorised ? (
        <Authorised />
      ) : (
        <Unauthorised
          handleMockLogin={handleMockLogin}
          wrapperHeight={wrapperHeight}
        />
      )}
      <FooterWrapper />
    </AppProviders>
  );
};

export default App;
