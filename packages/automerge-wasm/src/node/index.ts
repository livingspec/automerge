// @ts-ignore
import { setDefaultBackend } from "@livingspec/automerge";

import * as wasmBackend from "@livingspec/automerge-backend-wasm";

setDefaultBackend(wasmBackend);

export * from "@livingspec/automerge";
