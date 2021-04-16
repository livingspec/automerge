import { useEffect, useMemo, useState } from "react";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";

declare module "slate" {
  interface BaseElement {
    type: string;
  }
}

export default function Home() {
  const editor: ReactEditor = useMemo(
    () => withReact(createEditor() as any),
    []
  );

  const [value, setValue] = useState<Descendant[]>([
    {
      type: "document",
      children: [
        {
          type: "paragraph",
          children: [{ text: new Array(2048).fill("a").join() }],
        },
      ],
    },
  ]);

  useEffect(() => {
    const worker = new Worker(new URL("../worker/worker.ts", import.meta.url));
    worker.onmessage = (ev) => {
      if (ev.data === "ping") {
        worker.postMessage({ type: "init", state: value[0] });
      }
    };

    const { apply } = editor;
    editor.apply = (operation) => {
      worker.postMessage({ type: "operation", operations: [operation] });
      apply(operation);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      <h1>Text editor test</h1>
      <p>
        All the work is done within a worker, so when profiling make sure the
        worker is the target.
      </p>
      <p>
        <em>Steps to reproduce:</em>
      </p>
      <ol>
        <li>select all text, cut and paste a couple of times</li>
        <li>
          observe the memory usage by taking heap snapshots (the memory used is
          not counted against the heap, so without snapshots the real usage
          isn't shown).
        </li>
        <li>
          Also, take a couple of profiles to see the ever increasing time do to
          applyChanges.
        </li>
      </ol>
      <div style={{ padding: "1rem", border: "1px solid gray" }}>
        <Slate editor={editor} value={value} onChange={setValue}>
          <Editable />
        </Slate>
      </div>
    </div>
  );
}
