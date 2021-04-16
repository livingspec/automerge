import { SplitNodeOperation } from 'slate';

import { SyncValue } from '../../model';
import { getParent, getChildren, isElementRef } from '../../path';
import { cloneNode } from '../../utils';

const splitNode = (doc: SyncValue, op: SplitNodeOperation): SyncValue => {
  const [parent, index] = getParent(doc, op.path);
  if (!isElementRef(parent)) {
    throw new Error('not an element');
  }

  const target = parent.current.children[index];
  const inject = {
    ...cloneNode(target),
    ...op.properties,
  };

  if (target.text) {
    target.text.length > op.position &&
      target.text.deleteAt(op.position, target.text.length - op.position);
    op.position && inject.text.deleteAt(0, op.position);
  } else {
    target.children.splice(op.position, target.children.length - op.position);
    op.position && inject.children.splice(0, op.position);
  }

  parent.current.children.insertAt?.(index + 1, inject);

  return doc;
};

export default splitNode;
