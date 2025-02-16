#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { writeCollectionsConfig } from "./lib.js";
import * as fs from "node:fs";
import * as path from "node:path";

const argv = yargs(hideBin(process.argv))
  .usage(
    "Usage: $0 --collectionsConfig <collectionsConfig> --glamaholicConfig <glamaholicConfig> --outputFile <outputFile>",
  )
  .option("collectionsConfig", {
    alias: "cc",
    describe: "Path to your existing collections.json file",
    type: "string",
    demandOption: false,
    default: path.join(
      process.env.APPDATA,
      "XIVLauncher",
      "pluginConfigs",
      "Collections.json",
    ),
  })
  .option("glamaholicConfig", {
    alias: "gc",
    describe: "Path to your glamaholic.json file",
    type: "string",
    demandOption: false,
    default: path.join(
      process.env.APPDATA,
      "XIVLauncher",
      "pluginConfigs",
      "Glamaholic.json",
    ),
  })
  .option("outputFile", {
    alias: "o",
    describe: "Path to where you want to save the new collections.json file",
    type: "string",
    demandOption: false,
    default: path.join(
      process.env.APPDATA,
      "XIVLauncher",
      "pluginConfigs",
      "Collections.json",
    ),
  })
  .help().argv;

// Load JSON file from windows compatible path
const loadJSON = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf8"));
};
const collectionsConfig = loadJSON(argv.collectionsConfig);
const glamaholicConfig = loadJSON(argv.glamaholicConfig);

writeCollectionsConfig(collectionsConfig, glamaholicConfig, argv.outputFile);
