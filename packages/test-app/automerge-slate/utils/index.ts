import { Doc } from '@livingspec/automerge';

import toSync from './toSync';
import hexGen from './hexGen';

export * from './testUtils';

const toJS = <T = any>(node: T | Doc<T>): T => JSON.parse(JSON.stringify(node));

const cloneNode = (node: any) => toSync(toJS(node));

export { toSync, toJS, hexGen, cloneNode };
