import { Layout } from './UIComponents/Layout/Layout.tsx';
import './App.css';
import { PassportInput } from './UIComponents/Common/Input';
import { useCallback, useEffect, useState } from 'react';
import { authorize, getValue, setValue } from '../auth.ts';
import { Button } from './UIComponents/Layout/Button.tsx';
import MMLogo from './UIComponents/Pages/SignIn/MMLogo.tsx';
import { response } from '../registerAPI.ts';

export const StorageButton = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openStorageForm = () => {
    response.send('open_storage_form_modal');
  };

  const handleSubmit = async () => {
    if (!isAuth) {
      await handleAuth();
    }

    openStorageForm();
  };

  const handleAuth = async () => {
    setIsLoading(true);

    try {
      await authorize();
      setIsAuth(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Button
        isLoading={isLoading}
        logo={<MMLogo />}
        label="My keys"
        onClick={handleSubmit}
      />
    </div>
  );
};

export const StorageWidget = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    if (error && key) {
      setError(undefined);
    }
  }, [error, key]);

  const handleSave = useCallback(() => {
    if (!key) {
      setError('Required');
      return;
    } else {
      setBtnLoading(true);
      setValue({ value: key, key: 'OPENAI_API_KEY' })
        .then(() => {
          handleClose();
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setBtnLoading(false);
        });
    }
  }, [key]);

  const handleClose = () => {
    response.send('close_storage_form_modal');
  };

  useEffect(() => {
    getValue('OPENAI_API_KEY')
      .then((v) => {
        setKey(v.value);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      onClose={handleClose}
      loading={loading}
      title="Enter your OpenAI API key"
      subtitle="An API key is a unique code that identifies your requests to the API. Your API key is intended to be used only by you."
      submit={{
        label: 'Save',
        onClick: handleSave,
        isLoading: btnLoading,
      }}
    >
      <PassportInput
        autoFocus
        error={!!error}
        helpText={error}
        onChange={(e) => setKey(e.target.value)}
        value={key}
        placeholder="afik38749fwhfog04jfk45dos35kwtwcb"
        label="OpenAI API key"
      />
    </Layout>
  );
};
