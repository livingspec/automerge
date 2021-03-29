import { from, Text, getAllChanges } from "@livingspec/automerge-wasm";
import { expect } from "chai";

describe("getAllChanges issues", () => {
  it("should not fail", () => {
    const doc = from({ test: "1234" });

    expect(() => getAllChanges(doc)).not.to.throw();
  });
});
