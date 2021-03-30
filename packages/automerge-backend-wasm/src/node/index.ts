export * from "automerge-backend-wasm";

import { getChanges } from "automerge-backend-wasm";

// TODO: remove when backend supports
export const getAllChanges = (state) => getChanges(state, []);
