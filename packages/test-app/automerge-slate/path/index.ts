import { Element, Node, Path, Text } from 'slate';

import * as Automerge from '@livingspec/automerge';

import { SyncValue } from '../model';
import { toJS } from '../utils';

export const isTree = (node: Node): boolean => Boolean((node as any)?.children);

type ElementRef<TReturn = unknown> = {
  current: TReturn;
};

export const getTarget: <TDoc extends SyncValue | Node, TReturn = TDoc>(
  doc: TDoc,
  path: Path,
) => ElementRef<TReturn> = (doc, path) =>
  getTargetById(doc, pathToId(doc, path));

const pathToId = (doc: SyncValue | Node, path: Path): string => {
  const iterate = (current: any, idx: number) => {
    if (!(isTree(current) || current[idx])) {
      throw new TypeError(
        `path ${path.toString()} does not match tree ${JSON.stringify(
          current,
        )}`,
      );
    }

    return current[idx] || current?.children[idx];
  };

  return Automerge.getObjectId(path.reduce(iterate, doc));
};

const getTargetById: <TDoc, TReturn = TDoc>(
  doc: TDoc,
  id: string,
) => ElementRef<TReturn> = (doc, id) => {
  return {
    get current() {
      const queue = [doc];
      let current: any | undefined;

      while ((current = queue.shift())) {
        if (Automerge.getObjectId(current) === id) {
          return current;
        }

        // FIXME: slate collaborative passes the top level children, forcing
        //  this check. Children should always be present.
        if (Array.isArray(current)) {
          queue.push(...current);
        } else if (current.children) {
          queue.push(...current.children);
        }
      }

      return undefined;
    },
  };
};

export const getParentPath = (
  path: Path,
  level: number = 1,
): [number, Path] => {
  if (level > path.length) {
    throw new TypeError('requested ancestor is higher than root');
  }

  return [path[path.length - level], path.slice(0, path.length - level)];
};

export const getParent = (
  doc: SyncValue | Node,
  path: Path,
): [ElementRef, number] => {
  const [idx, parentPath] = getParentPath(path);

  return [getTarget(doc, parentPath), idx];
};

export const getChildren = (node: SyncValue | Node): any => {
  return (node as any).children || node;
};

export function isElementRef(
  value: ElementRef,
): value is ElementRef<{ children: Automerge.List<any> }> {
  return Element.isElement(toJS(value.current));
}

export function isTextRef(
  value: ElementRef,
): value is ElementRef<{ text: Automerge.Text }> {
  return Text.isText(toJS(value.current));
}
