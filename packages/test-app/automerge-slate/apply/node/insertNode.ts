import { InsertNodeOperation } from 'slate';

import { SyncValue } from '../../model';
import { getParent, getChildren, isElementRef } from '../../path';
import { toSync } from '../../utils';

const insertNode = (doc: SyncValue, op: InsertNodeOperation): SyncValue => {
  const [parent, index] = getParent(doc, op.path);

  if (!isElementRef(parent)) {
    throw new TypeError("Can't insert node into text node");
  }

  getChildren(parent.current).splice(index, 0, toSync(op.node));

  return doc;
};

export default insertNode;
