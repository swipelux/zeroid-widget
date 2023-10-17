import { AsyncRequest } from 'transport';

export class Widget {
  constructor(protected asyncRequest: AsyncRequest) {}
  openAIKey() {
    return this.asyncRequest.send('getKey', 'OPENAI_API_KEY');
  }

  credential(key: string) {
    return this.asyncRequest.send('getKey', key);
  }

  credentials() {
    return this.asyncRequest.send('getKeys');
  }

  hasAuth() {
    return this.asyncRequest.send('checkAuth');
  }

  addCredential(key: string, value: string) {
    return this.asyncRequest.send('setKey', { key, value });
  }
}
