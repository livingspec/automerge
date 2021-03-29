import { from, getAllChanges } from "@livingspec/automerge-wasm";
import { expect } from "chai";

describe('Fixes', () => {
  context("getAllChanges is not a function", () => {
    it("should be created", () => {
      const doc = from({ test: "1234" });

      expect(() => getAllChanges(doc)).not.to.throw();
    });
  });
});
