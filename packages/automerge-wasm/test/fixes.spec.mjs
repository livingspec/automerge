import Automerge from "@livingspec/automerge-wasm";
import { expect } from "chai";

describe('Fixes', () => {
  context("getAllChanges is not a function", () => {
    it("should be created", () => {
      const doc = Automerge.from({ test: "1234" });

      expect(() => Automerge.getAllChanges(doc)).not.to.throw();
    });
  });
});
