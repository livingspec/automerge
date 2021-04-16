import { SetNodeOperation } from 'slate';

import { SyncValue } from '../../model';
import { getTarget } from '../../path';

const setNode = (doc: SyncValue, op: SetNodeOperation): SyncValue => {
  const node = getTarget(doc, op.path);

  for (const [key, value] of Object.entries(op.newProperties)) {
    (node.current as any)[key] = value ?? null;
  }

  return doc;
};

export default setNode;
