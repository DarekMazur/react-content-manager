import AppProviders from './utils/providers/AppProviders.tsx';
import Root from './pages/Root/Root.tsx';

const App = () => {
  return (
    <AppProviders>
      <Root />
    </AppProviders>
  );
};

export default App;
