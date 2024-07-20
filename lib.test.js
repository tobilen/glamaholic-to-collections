import { describe, it, expect } from "@jest/globals";
import glamaholicConfig from "./fixtures/glamaholic_matching.json";
import collectionsConfig from "./fixtures/collections_matching.json";
import collectionsConfigEmpty from "./fixtures/collections_empty.json";
import glamaholicConfigPartial from "./fixtures/glamaholic_partial.json";
import collectionsConfigPartial from "./fixtures/collections_partial.json";
import { convertPlates, mergePlates } from "./lib.js";

describe("convertPlates", () => {
  it("converts the glamour blocks", () => {
    const result = convertPlates(glamaholicConfig);

    const expectedGlamourSets = collectionsConfig["GlamourTree"][
      "Directories"
    ].find((dir) => dir.Name === "Imported from Glamaholic")["GlamourSets"];
    expect(result).toEqual(expectedGlamourSets);
  });
});

describe("mergePlates", () => {
  it("merges the plates into collectionsConfig", () => {
    const result = mergePlates(collectionsConfigEmpty, glamaholicConfig);

    expect(result).toEqual(collectionsConfig);
  });

  it("does not overwrite glams with the same name", () => {
    const result = mergePlates(
      collectionsConfigPartial,
      glamaholicConfigPartial,
    );
    expect(result).toEqual(collectionsConfig);
  });
});
