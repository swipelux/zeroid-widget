import './global.d.ts';
import { initByVariant } from './widget/initZeroId.ts';

const sdkBuilder = () => {
  return {
    init: initByVariant('default'),
    initNano: initByVariant('nano'),
    initInvisible: initByVariant('invisible'),
    initStorage: initByVariant('storage'),
  };
};

window.ZeroIdSdk = sdkBuilder();
export const sdk = sdkBuilder();
