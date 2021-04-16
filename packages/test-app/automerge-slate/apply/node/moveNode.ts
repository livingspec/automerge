import { MoveNodeOperation } from 'slate';

import { cloneNode } from '../../utils';
import { SyncValue } from '../../model';
import { getParent, isElementRef } from '../../path';

const moveNode = (doc: SyncValue, op: MoveNodeOperation): SyncValue => {
  const [from, fromIndex] = getParent(doc, op.path);
  const [to, toIndex] = getParent(doc, op.newPath);

  if (!isElementRef(from) || !isElementRef(to)) {
    throw new TypeError("Can't move node as child of a text node");
  }

  const target = cloneNode(from.current.children.splice(fromIndex, 1)[0]);

  to.current.children.splice(toIndex, 0, target);

  return doc;
};

export default moveNode;
