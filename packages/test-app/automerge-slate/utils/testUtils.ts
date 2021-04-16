import * as Automerge from '@livingspec/automerge';

import { SyncDoc, toSync } from '../index';

import { Node } from 'slate';

export const createText = (text: string = '') => ({
  text,
});

export const createNode = (
  type: string = 'paragraph',
  text: string = '',
  data?: { [key: string]: any },
) => ({
  type,
  children: [createText(text)],
  ...data,
});

export const createDoc = (children?: any): SyncDoc =>
  Automerge.from(toSync({ ...createValue(children), cursors: {} }));

export const createValue = (children?: any): { children: Node[] } => ({
  children: children || [createNode()],
});

export const cloneDoc = (doc: any) => Automerge.change(doc, '', d => d);
