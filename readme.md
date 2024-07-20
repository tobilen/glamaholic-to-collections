# Glamaholic-To-Collections

## Description
Convert your glamaholic plates into collections

## Installation
1. Make sure nodejs is installed on your computer: https://nodejs.org/en/download/package-manager
2. Open a terminal (Win+R, type `cmd`, hit enter)
3. In the window, enter the following command
```bash
npm install -g glamaholic-to-collections
```

## Usage
1. Open a terminal (see above)
2. Enter `glamaholic-importer`

This will automatically take the Glamaholic and Collections configs from the default installation location of XIVLauncher (`%APPDATA%/XIVLauncher/pluginConfigs`), create a backup of your Collections.json and replace it with a new version that has your Glamaholic plates added to it in a folder called `Imported from Glamaholic`

### Nonstandard installation locations
Run `glamaholic-importer help` to see a list of commands you can pass to it to change the import and export file paths.
