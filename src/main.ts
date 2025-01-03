import { AsyncLocalStorage } from 'node:async_hooks';

const context = new AsyncLocalStorage();

type Callable = () => unknown;
type Context  = Record<string, any>;

export function getContext(): Context {
  return context.getStore() as Context;
};

export function createContext(ctx: Context, handler: Callable) {
  return context.run(ctx, handler);
};

export default {
  createContext,
  getContext,
};
