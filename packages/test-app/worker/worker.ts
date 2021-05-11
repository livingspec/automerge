import {
  from,
  init,
  applyChanges,
  getAllChanges,
  change,
  initSyncState,
  generateSyncMessage,
  receiveSyncMessage,
  SyncState,
} from "@livingspec/automerge";

import { applySlateOps, RootWithCursors, toSync } from "../automerge-slate";

let doc: RootWithCursors;
let docSyncState: SyncState;

let remoteDoc = init();
let remoteDocSyncState: SyncState;

onmessage = (message) => {
  if (message.data.type === "init") {
    doc = from({ cursors: {}, children: [toSync(message.data.state)] });
  } else if (message.data.type === "operation") {
    doc = change(doc, applySlateOps(message.data.operations));
    // simulate re-hydrating, which we have to do at a certain point due to high memory usage
    applyChanges(init(), getAllChanges(doc));

    // simulate sync
    [doc, remoteDoc, docSyncState, remoteDocSyncState] = sync(
      doc,
      remoteDoc,
      docSyncState,
      remoteDocSyncState
    );
  }
};

function sync(
  a,
  b,
  aSyncState = initSyncState(),
  bSyncState = initSyncState()
) {
  const MAX_ITER = 10;
  let aToBmsg = null;
  let bToAmsg = null;
  let i = 0;

  do {
    [aSyncState, aToBmsg] = generateSyncMessage(a, aSyncState);
    [bSyncState, bToAmsg] = generateSyncMessage(b, bSyncState);

    if (aToBmsg) {
      [b, bSyncState] = receiveSyncMessage(b, bSyncState, aToBmsg);
    }
    if (bToAmsg) {
      [a, aSyncState] = receiveSyncMessage(a, aSyncState, bToAmsg);
    }

    if (i++ > MAX_ITER) {
      throw new Error(
        `Did not synchronize within ${MAX_ITER} iterations. Do you have a bug causing an infinite loop?`
      );
    }
  } while (aToBmsg || bToAmsg);

  return [a, b, aSyncState, bSyncState];
}

postMessage("ping");
