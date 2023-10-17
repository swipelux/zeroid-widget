import { ethers, Signer } from 'ethers';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';

const baseUrl = import.meta.env.VITE_SERVER_URL;

async function nonce(address: string) {
  return await fetch(`${baseUrl}/auth/nonce`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      address: address,
    }),
  }).then((res) => res.json().then((b) => b['nonce']));
}

async function acquire(
  authNonce: string,
  walletAddress: string,
  signer: Signer
) {
  return await fetch(`${baseUrl}/auth/acquire`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      signature: await signer.signMessage(authNonce),
      address: walletAddress,
      nonce: authNonce,
    }),
  });
}

export async function sumsubToken(): Promise<string> {
  return await fetch(`${baseUrl}/sumsub/token`, {
    mode: 'cors',
    credentials: 'include',
    method: 'POST',
  }).then((res) => res.json().then((body) => body.token));
}

export async function authorize(): Promise<void> {
  const [provider, address] = await ethereumProviderAndAddress();
  await acquire(
    await nonce(address),
    address,
    // @ts-ignore
    new ethers.providers.Web3Provider(provider).getSigner()
  );
}

export async function getValues() {
  return await fetch(`${baseUrl}/vc`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
}

export async function getValue(key: string) {
  return await fetch(`${baseUrl}/vc/${key}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res.json();
    }
  });
}

export async function setValue(dto: { key: string; value: string }) {
  return await fetch(`${baseUrl}/vc`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dto),
  }).then((res) => {
    return res.json();
  });
}

export async function checkAuth() {
  return await fetch(`${baseUrl}/auth`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return true;
    } else {
      throw res.json();
    }
  });
}

async function ethereumProviderAndAddress(): Promise<[SDKProvider, string]> {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      if (!window.ethereum.isMetaMask) {
        reject('MetaMask is not installed');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (
        accounts &&
        Array.isArray(accounts) &&
        typeof accounts[0] === 'string'
      ) {
        resolve([window.ethereum, accounts[0]]);
        return;
      } else {
        reject('Address is not defined');
        return;
      }
    }

    const MMSDK = new MetaMaskSDK();
    const address = await MMSDK.connect();
    if (address && typeof address === 'string') {
      resolve([MMSDK.getProvider(), address]);
      return;
    } else {
      reject('Address is not defined');
      return;
    }
  });
}
