import { Operation } from "slate";

import node from "./node";
import text from "./text";

import { SyncDoc } from "../model";

const setSelection = (doc: any) => doc;

const opType = {
  ...text,
  ...node,
  set_selection: setSelection,
};

const applyOperation = (doc: SyncDoc, op: Operation): SyncDoc => {
  const applyOp = opType[op.type];

  if (!applyOp) {
    throw new TypeError(`Unsupported operation type: ${op.type}!`);
  }

  return applyOp(doc, op as any);
};

export const applySlateOps = (operations: Operation[]) => (doc: SyncDoc) =>
  operations.reduce(applyOperation, doc);
