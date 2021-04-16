import { InsertTextOperation, RemoveTextOperation } from "slate";

import { getTarget, isTextRef } from "../path";
import { SyncValue } from "../model";

export const insertText = (
  doc: SyncValue,
  op: InsertTextOperation
): SyncValue => {
  const node = getTarget(doc, op.path);
  if (!isTextRef(node)) {
    throw new Error("Not a text node");
  }

  node.current.text.insertAt?.(
    Math.min(node.current.text.length, op.offset),
    ...op.text
  );

  return doc;
};

export const removeText = (
  doc: SyncValue,
  op: RemoveTextOperation
): SyncValue => {
  const node = getTarget(doc, op.path);
  if (!isTextRef(node)) {
    throw new Error("Not a text node");
  }

  node.current.text.deleteAt?.(
    Math.min(node.current.text.length, op.offset),
    [...op.text].length
  );

  return doc;
};

export default {
  insert_text: insertText,
  remove_text: removeText,
};
