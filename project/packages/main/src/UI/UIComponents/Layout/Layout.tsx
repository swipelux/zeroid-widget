import { PropsWithChildren } from 'react';
import './root.css';
import styles from './layout.module.css';
import Logo from './logo.tsx';
import CaptionLogo from './caption.tsx';
import { Button, ButtonProps } from './Button.tsx';
import { CloseIcon } from './CloseIcon.tsx';

const LINK_FOR_LOGO = 'https://swipelux.com';

interface Props extends PropsWithChildren {
  hideHeader?: boolean;
  disablePadding?: boolean;
  submit?: ButtonProps;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  onClose?: () => void;
}

export const Layout = ({
  disablePadding,
  children,
  hideHeader,
  submit,
  title,
  subtitle,
  loading,
  onClose,
}: Props) => {
  const bodyClass = disablePadding
    ? `${styles.body_wrapper} ${styles.wot_padding}`
    : styles.body_wrapper;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {hideHeader ? null : (
          <>
            <Logo />
            <div className={styles.label}>Swipelux Zero ID</div>
            {onClose && <CloseIcon onClick={onClose} />}
          </>
        )}
      </div>
      <div className={bodyClass}>
        {loading ? (
          <div className={styles.loader} />
        ) : (
          <>
            {title ? <div className={styles.title}>{title}</div> : null}
            {subtitle ? (
              <div className={styles.subtitle}>{subtitle}</div>
            ) : null}
            {children}
          </>
        )}
      </div>
      <div className={styles.footer}>
        {submit && <Button {...submit} />}
        <div className={styles.caption_wrapper}>
          <a
            className={styles.caption_link}
            href={LINK_FOR_LOGO}
            target="_blank"
            rel="noreferrer"
          >
            <span>Powered by</span>
            <CaptionLogo />
          </a>
        </div>
      </div>
    </div>
  );
};
