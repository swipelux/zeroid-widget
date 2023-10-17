import { Layout } from '../../Layout/Layout.tsx';
import styles from './sumsub.module.css';
import { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
export const SumSub = ({
  getToken,
  onSubmit = () => {},
}: {
  getToken: () => Promise<string>;
  onSubmit?: () => unknown;
}) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);
  const handleExpiration = async () => {
    return getToken();
  };

  const handleMessageEvent = (msg: string) => {
    if (msg === 'idCheck.applicantReviewComplete') {
      onSubmit();
    }
  };

  return (
    <Layout loading={!token} hideHeader>
      <div className={styles.wrapper}>
        {token ? (
          <SumsubWebSdk
            onMessage={handleMessageEvent}
            accessToken={token}
            expirationHandler={handleExpiration}
          />
        ) : null}
      </div>
    </Layout>
  );
};
