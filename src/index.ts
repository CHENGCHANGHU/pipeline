export class Pipeline {
  middlewares: Task[] = [];

  constructor() {}

  pipe(fn: Task) {
    this.middlewares.push(fn);
    return this;
  }

  async run(params: any) {
    let result = params;
    for(let fn of this.middlewares) {
      // const { promise, resolve, reject } = Promise.withResolvers();
      let resolve;
      let reject;
      const promise = new Promise((...args) => [resolve, reject] = args);
      fn(result, resolve, reject);
      try {
        result = await promise;
      } catch (e) {
        result = e;
        break;
      }
    }
    return result;
  }
}

export interface Task {
  (data: any, next?: (result?: any) => void, stop?: (reason?: any) => void): void;
}
