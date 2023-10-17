import { CrossDomainMessenger, Message } from './CrossDomainMessenger';
import * as uuid from 'uuid';

interface RequestMessage<T = unknown> extends Message {
  type: string;
  payload: {
    method: string;
    data: T;
  };
}

export class AsyncRequest {
  requests: Map<
    string,
    {
      resolve: (data: unknown) => void;
      reject: (error: unknown) => void;
    }
  >;
  constructor(protected messenger: CrossDomainMessenger) {
    this.requests = new Map();

    this.messenger.subscribe((message) => {
      const promiseHandlers = this.requests.get(message.type);
      if (promiseHandlers) {
        promiseHandlers.resolve(message.payload);
        this.requests.delete(message.type);
      }
    });
  }

  send(method: string, data?: unknown) {
    return new Promise((resolve, reject) => {
      const requestUid = uuid.v4();
      this.requests.set(requestUid, { resolve, reject });

      const requestMessage: RequestMessage = {
        type: requestUid,
        payload: {
          data: data,
          method: method,
        },
      };

      this.messenger.send(requestMessage);
    });
  }
}
