import { RemoveNodeOperation } from 'slate';

import { SyncValue } from '../../model';
import { getParent, isElementRef } from '../../path';

export const removeNode = (
  doc: SyncValue,
  op: RemoveNodeOperation,
): SyncValue => {
  const [parent, index] = getParent(doc, op.path);
  if (!isElementRef(parent)) {
    throw new TypeError("Can't remove node from text node");
  }

  parent.current.children.splice(index, 1);

  return doc;
};

export default removeNode;
