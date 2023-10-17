export class AsyncResponse {
  constructor(methods: Record<string, (...args: any) => Promise<unknown>>) {
    window.addEventListener('message', (event) => {
      const method = methods[event.data?.payload?.method];
      if (!method) {
        return;
      }
      this.sendResponseToParent(event, () => method(event.data.payload.data));
    });
  }

  private sendResponseToParent(event: MessageEvent, method: () => Promise<unknown>) {
    method().then((value) => {
      this.send(event.data.type, value, event.origin);
    });
  }

  send(type: string, payload?: any, origin = '*') {
    window.parent.postMessage({ type, payload }, origin);
  }
}
