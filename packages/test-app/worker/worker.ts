import { init } from '@livingspec/automerge-wasm';

const doc = init();

console.log(doc);

onmessage = ev => {
    console.log(ev);
};

postMessage('ping');
