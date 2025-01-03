Context-Module
==============

Just a single-point-of-truth for applications that want to pass context around.
Useful as a side-channel for communicating global things like loglevels or per-http-request things like user authentication to allow dependencies to not be http-aware.

## Usage

<!-- TODO: actually showcase api and explain -->

```typescript

import ContextModule from '@finwo/context-module';
// Or
import { createContext, getContext } from '@finwo/context-module';

// Some repository, not http-aware
async function getData(table: string) {
  const ctx = ContextModule.getContext();
  if (!ctx.auth) return false;
  if (!Array.isArray(ctx.auth.allowedTables)) return false;
  return ctx.auth.allowedTables.includes(table);
}

// Http interface
async function apiEndpoint(req, res) {
  const ctx = ContextModule.getContext();

  // Authenticate user (here or earlier in middleware)
  ctx.auth = { user: 'someone', allowedTables: ['users'] };

  // Perform an action (allowed)
  res.send(await getData('users'));
  // Or
  // Perform an action (disallowed)
  res.send(await getData('secrets'));
}

// Mock http server, showing how to call the endpoint
http.server((req, res) => {
    // Do some routing, then call the endpoint
    ContextModule.createContext({
      auth: null,
    }, () => apiEndpoint(req, res));
});
```
