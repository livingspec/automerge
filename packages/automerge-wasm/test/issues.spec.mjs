import Automerge from "@livingspec/automerge-wasm";
import { expect } from "chai";

describe("text issues", () => {
  context("text field with less that 63", () => {
    it("should show wrens", () => {
      expect(
        toJs(
          Automerge.from({
            birds: {
              magpies: 4,
              text: new Automerge.Text(new Array(63).fill("a")),
              wrens: 3,
            },
          })
        )
      ).to.have.nested.property("birds.wrens");
    });
  });

  context("text field with more that 63", () => {
    [1, 28, 63, 64, 100, 127, 128, 191, 192, 256, 383, 384, 511, 512].forEach(length => {
      it("should show wrens", () => {
        expect(
          toJs(
            Automerge.from({
              birds: {
                magpies: 4,
                test: new Automerge.Text(new Array(length).fill('a')),
                wrens: 3,
              },
            })
          )
        ).to.have.nested.property("birds.wrens");
      });
    });
  });

  function toJs(doc) {
    return JSON.parse(JSON.stringify(doc));
  }
});
