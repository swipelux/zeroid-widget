import { useState } from 'react';
import { authorize } from '../auth.ts';
import { Button } from './UIComponents/Layout/Button.tsx';
import MMLogo from './UIComponents/Pages/SignIn/MMLogo.tsx';
import './App.css';

export const WidgetNano = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    setIsLoading(true);
    authorize()
      .then(() => {
        setIsAuth(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const label = isLoading ? 'Loading...' : isAuth ? 'Connected' : 'Connect';

  return (
    <div className="container">
      <Button
        isLoading={isLoading}
        disabled={isAuth}
        logo={<MMLogo />}
        label={label}
        onClick={isAuth ? undefined : handleAuth}
      />
    </div>
  );
};
