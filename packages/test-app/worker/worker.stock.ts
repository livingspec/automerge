// @ts-ignore
import { from, change, setDefaultBackend } from "@livingspec/automerge";

import * as backend from "automerge-backend-wasm";

setDefaultBackend(backend);

postMessage(JSON.stringify(backend));
