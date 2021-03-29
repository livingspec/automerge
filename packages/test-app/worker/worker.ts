import { from, Text } from "@livingspec/automerge-wasm";

const initialState = {
  birds: {
    wrens: 3,
    magpies: 4,
    nested: {
      text: new Text(new Array(100).fill("a")),
    },
  },
};

console.log(from(initialState));

onmessage = (ev) => {
  // tests a communication issue in next and webworkers
  console.log(ev);
};

postMessage("ping");
