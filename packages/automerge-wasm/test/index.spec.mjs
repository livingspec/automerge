import { from, Text } from "@livingspec/automerge-wasm";
import { expect } from "chai";

describe("text issues", () => {
  context("text field with less that 63", () => {
    it("should show wrens", () => {
      expect(
        toJs(
          from({
            birds: {
              magpies: 4,
              nested: {
                text: new Text(new Array(63).fill("a")),
              },
              wrens: 3,
            },
          })
        )
      ).to.have.nested.property("birds.wrens");
    });
  });

  context("text field with more that 63", () => {
    it("should show wrens", () => {
      expect(
        toJs(
          from({
            birds: {
              magpies: 4,
              nested: {
                text: new Text(new Array(64).fill("a")),
              },
              wrens: 3,
            },
          })
        )
      ).to.have.nested.property("birds.wrens");
    });
  });

  function toJs(doc) {
    return JSON.parse(JSON.stringify(doc));
  }
});
