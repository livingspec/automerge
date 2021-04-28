import "../build/mjs/index_bg.wasm";

import * as backend from "../build/mjs/index_bg";

export const init = backend.init;
export const applyChanges = backend.applyChanges;
export const applyLocalChange = backend.applyLocalChange;
export const getChanges = backend.getChanges;
export const getAllChanges = backend.getAllChanges;
export const getMissingDeps = backend.getMissingDeps;
export const getPatch = backend.getPatch;
export const load = backend.load;
export const clone = backend.clone;
export const free = backend.free;
export const getHeads = backend.getHeads;
export const loadChanges = backend.loadChanges;
export const save = backend.save;
export const decodeSyncMessage = backend.decodeSyncMessage;
export const decodeSyncState = backend.decodeSyncState;
export const encodeSyncMessage = backend.encodeSyncMessage;
export const encodeSyncState = backend.encodeSyncState;
export const generateSyncMessage = backend.generateSyncMessage;
export const initSyncState = backend.initSyncState;
export const receiveSyncMessage = backend.receiveSyncMessage;
