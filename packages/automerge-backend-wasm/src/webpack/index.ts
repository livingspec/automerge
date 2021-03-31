import "../build/mjs/index_bg.wasm";

import * as backend from "../build/mjs/index_bg";

export const init = backend.init;
export const applyChanges = backend.applyChanges;
export const applyLocalChange = backend.applyLocalChange;
export const getChanges = backend.getChanges;
// TODO: remove when backend supports
export const getAllChanges = (state) => backend.getChanges(state, []);
export const getMissingDeps = backend.getMissingDeps;
export const getPatch = backend.getPatch;
export const load = backend.load;
export const clone = backend.clone;
export const free = backend.free;
export const getHeads = backend.getHeads;
export const loadChanges = backend.loadChanges;
export const save = backend.save;
