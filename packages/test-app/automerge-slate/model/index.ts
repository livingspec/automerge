import { Doc } from "@livingspec/automerge";
import { RootWithCursors } from "./RootWithCursors";

export type SyncValue = RootWithCursors["children"];

export type SyncDoc = Doc<RootWithCursors>;

export * from "./RootWithCursors";