// @ts-ignore
import { setDefaultBackend } from "automerge";

import * as wasmBackend from "@livingspec/automerge-backend-wasm";

setDefaultBackend(wasmBackend);

export * from "automerge";
