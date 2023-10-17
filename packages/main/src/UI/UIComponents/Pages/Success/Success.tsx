import { Layout } from '../../Layout/Layout.tsx';
import styles from './success.module.css';
export const Success = () => {
  return (
    <Layout hideHeader>
      <img src="./asset/Success.png" />
      <div className={styles.title_wrapper}>
        <div className={styles.title}>You are awesome !</div>
        <div className={styles.subtitle}>
          You saved about 84.3 hours. You can use different apps without going
          through KYC.
        </div>
      </div>
      <div className={styles.timer_wrapper}>
        You will pass on details after 3 seconds...
      </div>
    </Layout>
  );
};
