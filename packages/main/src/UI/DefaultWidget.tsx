import { useState } from 'react';
import { SignIn } from './UIComponents/Pages/SignIn/SignIn.tsx';
import { authorize, sumsubToken } from '../auth.ts';
import { SumSub } from './UIComponents/Pages/SumSub/SumSub.tsx';
import { Success } from './UIComponents/Pages/Success/Success.tsx';
import './App.css';

enum Step {
  MetaMask = 1,
  SumSub,
  Success,
}

export const Widget = () => {
  const [step, setStep] = useState(Step.MetaMask);

  const renderCurrentStep = {
    [Step.MetaMask]: (
      <SignIn
        onSubmit={async () => {
          await authorize();
          setStep(Step.SumSub);
        }}
      />
    ),
    [Step.SumSub]: <SumSub getToken={sumsubToken} />,
    [Step.Success]: <Success />,
  };

  return <div className="container">{renderCurrentStep[step]}</div>;
};
