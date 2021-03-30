import { from, Text, change, getAllChanges } from "@livingspec/automerge-wasm";

const initialState = {
  birds: {
    wrens: 3,
    magpies: 4,
    nested: {
      text: new Text(new Array(100).fill("a")),
    },
  },
};

// tests a communication issue in next and webworkers
onmessage = () => {
  let doc = change(from(initialState), (d) => {
    d.birds.wrens = 5;
  });

  console.log("doc", JSON.parse(JSON.stringify(doc)));

  console.log("all changes", getAllChanges(doc));
};

postMessage("ping");
