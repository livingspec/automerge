import {
  from,
  init,
  applyChanges,
  getAllChanges,
  change,
} from "@livingspec/automerge-wasm";

import { applySlateOps, RootWithCursors } from "../automerge-slate";

let doc: RootWithCursors;

onmessage = (message) => {
  if (message.data.type === "init") {
    doc = from({ cursors: {}, children: [message.data.state] });
  } else if (message.data.type === "operation") {
    doc = change(doc, applySlateOps(message.data.operations));
    // simulate re-hydrating, which we have to do at a certain point due to high memory usage
    applyChanges(init(), getAllChanges(doc));
  }
};

postMessage("ping");
