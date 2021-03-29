// @ts-ignore
export * from 'automerge-backend-wasm';

import * as Backend from 'automerge-backend-wasm';

export const getAllChanges = state => Backend.getChanges(state, []);
