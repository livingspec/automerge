export * from "../build/cjs";

import { getChanges } from "../build/cjs";

// TODO: remove when backend supports
export const getAllChanges = (state) => getChanges(state, []);
