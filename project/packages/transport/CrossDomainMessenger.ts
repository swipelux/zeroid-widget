export interface Message<T = unknown> {
  type: string;
  payload: T;
  error?: unknown;
}

export class CrossDomainMessenger {
  observers: Array<(message: Message) => void> = [];

  constructor(
    protected receiver: HTMLIFrameElement,
    filter?: (event: MessageEvent) => boolean
  ) {
    window.addEventListener('message', (event) => {
      if (filter && !filter(event)) {
        return;
      }

      const message: Message = event.data;

      for (const observer of this.observers) {
        observer(message);
      }
    });
  }
  send(message: Message) {
    this.receiver.contentWindow?.postMessage(message, '*');
  }

  subscribe(observer: (message: Message) => void) {
    this.observers.push(observer);
    const idx = this.observers.length - 1;

    return {
      unsubscribe: () => {
        this.observers.splice(idx, 1);
      },
    };
  }
}
