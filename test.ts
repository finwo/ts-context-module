// TODO: actually test with reporting

import ContextModule from './src/main';

async function getData(table: string) {
  const ctx = ContextModule.getContext();
  if (!ctx.auth) return false;
  if (!Array.isArray(ctx.auth.allowedTables)) return false;
  return ctx.auth.allowedTables.includes(table);
}

(async () => {

  const result_0 = await ContextModule.createContext({
    auth: { user: 'someone', allowedTables: ['bar'] },
  }, () => getData('foo'));

  const result_1 = await ContextModule.createContext({
    auth: { user: 'someone', allowedTables: ['foo'] },
  }, () => getData('foo'));

  const result_2 = await ContextModule.createContext({
    auth: null,
  }, () => getData('foo'));

  console.log({
    result_0, // "false"
    result_1, // "true"
    result_2, // "false"
  });

})();
