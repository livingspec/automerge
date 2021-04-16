import { Element } from "slate";

export interface RootWithCursors {
  cursors: Cursors;
  children: Element[];
}

export type Cursors = {
  [connectionId: string]: Cursor;
};

export interface Cursor extends CursorData {
  isForward: boolean;
  anchor: { path: number[]; offset: number };
  focus: { path: number[]; offset: number };
  [key: string]: any;
}

export interface CursorData {
  [key: string]: any;
}
