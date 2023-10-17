import { getValue, getValues, setValue, checkAuth } from './auth.ts';
import { AsyncResponse } from 'transport';

const Methods: Record<string, (...args: any) => Promise<unknown>> = {
  getKeys: getValues,
  getKey: getValue,
  setKey: setValue,
  checkAuth: checkAuth,
};

export function registerAPIMethods(
  methods: Record<string, (...args: any) => Promise<unknown>>
) {
  return new AsyncResponse(methods);
}

export const response = registerAPIMethods(Methods);
