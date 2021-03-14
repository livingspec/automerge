import {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    const worker = new Worker(new URL('../worker/worker.ts', import.meta.url));
    worker.onmessage = ev => {
      if (ev.data === 'ping') {
        worker.postMessage('test');
        worker.postMessage('test');
      }
    }
  }, []);

  return <div>test</div>;
}
