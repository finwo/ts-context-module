import { AsyncLocalStorage } from 'node:async_hooks';

const context = new AsyncLocalStorage();

type Callable<T> = () => T;
type Context     = Record<string, any>;

export function getContext(): Context {
  return context.getStore() as Context;
};

export function createContext<T = unknown>(ctx: Context, handler: Callable<T>) {
  return context.run(ctx, handler);
};

export default {
  createContext,
  getContext,
};
