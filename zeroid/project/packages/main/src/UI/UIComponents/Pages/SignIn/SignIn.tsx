import { Layout } from '../../Layout/Layout.tsx';
import MMLogo from './MMLogo.tsx';
import { useState } from 'react';

const STEPS_INFO = {
  FIRST: {
    title: 'Simplified Account Management',
    subtitle:
      'Pass the KYC procedure once and easily interact with digital platforms in one click.',
    img: './asset/first_screen/pic1.png',
  },
  SECOND: {
    title: 'Simplified Account Management',
    subtitle:
      'Pass the KYC procedure once and easily interact with digital platforms in one click.',
    img: './asset/first_screen/pic2.png',
  },
  THIRD: {
    title: 'Simplified Account Management',
    subtitle:
      'Pass the KYC procedure once and easily interact with digital platforms in one click.',
    img: './asset/first_screen/pic3.png',
  },
};

type StepKeys = keyof typeof STEPS_INFO;

export const SignIn = ({ onSubmit }: { onSubmit: () => void }) => {
  const [step] = useState<StepKeys>('FIRST');

  return (
    <Layout
      title={STEPS_INFO[step].title}
      subtitle={STEPS_INFO[step].subtitle}
      submit={{
        label: 'Login with Metamask',
        logo: <MMLogo />,
        onClick: onSubmit,
      }}
    >
      <img style={{ height: 216, width: '100%' }} src={STEPS_INFO[step].img} />
    </Layout>
  );
};
