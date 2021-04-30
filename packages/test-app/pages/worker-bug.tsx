import { useEffect, useState } from "react";

declare module "slate" {
  interface BaseElement {
    type: string;
  }
}

export default function Home() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const worker = new Worker(
      new URL("../worker/worker.stock.ts", import.meta.url)
    );

    worker.onmessage = (ev) => setValue(ev.data);

    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      The shape of the backend as webpack sees it "{value}". Empty object means
      no exports.
    </div>
  );
}
