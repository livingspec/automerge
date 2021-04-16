import { MergeNodeOperation, Node } from 'slate';

import { SyncValue } from '../../model';
import { getParent, getChildren, isElementRef } from '../../path';
import { toJS, cloneNode } from '../../utils';

const mergeNode = (doc: SyncValue, op: MergeNodeOperation): SyncValue => {
  const [parent, index] = getParent(doc, op.path);
  if (!isElementRef(parent)) {
    throw new Error('not an element');
  }

  const prev = parent.current.children[index - 1];
  const next = parent.current.children[index];

  if ((prev as any).text) {
    prev.text.insertAt(prev.text.length, ...toJS(next.text).split(''));
  } else {
    getChildren(next).forEach((n: Node) =>
      getChildren(prev).push(cloneNode(n)),
    );
  }

  parent.current.children.deleteAt?.(index, 1);

  return doc;
};

export default mergeNode;
