import { Range } from "slate";

import { CursorData, RootWithCursors } from "../model";

export const setCursor = (
  id: string,
  selection: Range | null,
  cursorData: CursorData
) => (doc: RootWithCursors) => {
  if (selection) {
    doc.cursors[id] = {
      ...doc.cursors[id],
      ...cursorData,
      ...selection,
      isForward: Range.isForward(selection),
    };
  } else {
    delete doc.cursors[id];
  }

  return doc;
};
