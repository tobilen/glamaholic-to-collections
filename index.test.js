import { describe, it, expect } from "@jest/globals";
import glamoholicConfig from "./fixtures/glamoholic.json";
// import collectionsConfig from "./fixtures/collections.json";
import { convert } from "./index.js";

describe("convert", () => {
  it("converts the glamour blocks", () => {
    const result = convert(glamoholicConfig);
    expect(result).toMatchSnapshot();
  });
});

describe("convertAndMerge", () => {
  it("merges the glamour blocks into an existing collections config", () => {});
});
