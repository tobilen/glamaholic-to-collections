import * as fs from "node:fs";

const convertSlotName = (slot) => {
  switch (slot) {
    case "Hands":
      return "Gloves";
    default:
      return slot;
  }
};

export const convertPlates = (glamaholicConfig) =>
  glamaholicConfig["Plates"].map((plate) => ({
    $type: "Collections.GlamourSet, Collections",
    Name: plate.Name,
    Items: Object.entries(plate.Items).reduce(
      (acc, [slot, item]) => {
        if (slot === "$type") return acc;

        return {
          ...acc,
          [convertSlotName(slot)]: {
            ...item,
            $type: "Collections.GlamourItem, Collections",
          },
        };
      },
      {
        $type:
          "System.Collections.Generic.Dictionary`2[[Collections.EquipSlot, Collections],[Collections.GlamourItem, Collections]], System.Private.CoreLib",
      },
    ),
  }));

export const mergePlates = (collectionsConfig, glamaholicConfig) => {
  const plates = convertPlates(glamaholicConfig);

  const processedDirectories = collectionsConfig.GlamourTree.Directories.map(
    (dir) => {
      if (dir.Name !== "Imported from Glamaholic") return dir;

      // Make sure we don't overwrite existing plates
      const existingPlateNames = dir.GlamourSets.map((plate) => plate.Name);
      const filteredPlates = plates.filter(
        (plate) => !existingPlateNames.includes(plate.Name),
      );

      return {
        ...dir,
        GlamourSets: [...dir.GlamourSets, ...filteredPlates],
      };
    },
  );

  const hasGlamaholicDir = processedDirectories.some(
    (dir) => dir.Name === "Imported from Glamaholic",
  );

  return {
    ...collectionsConfig,
    GlamourTree: {
      ...collectionsConfig.GlamourTree,
      Directories: hasGlamaholicDir
        ? processedDirectories
        : [
            ...collectionsConfig.GlamourTree.Directories,
            {
              $type: "Collections.GlamourDirectory, Collections",
              Name: "Imported from Glamaholic",
              GlamourSets: plates,
            },
          ],
    },
  };
};

export const writeCollectionsConfig = (collectionsConfig, glamaholicConfig) => {
  const newCollectionsConfig = mergePlates(collectionsConfig, glamaholicConfig);

  fs.writeFileSync(
    "collections.json",
    JSON.stringify(newCollectionsConfig, null, 2),
  );

  // Log a success message with the full path to the collections.json file
  console.log(
    `collections.json has been written to ${process.cwd()}/collections.json`,
  );
};
