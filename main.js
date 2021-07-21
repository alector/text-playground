// add demo comment

let readlineSync = require("readline-sync")
const TextProcessor = require("./src/meta-transformers/TextProcessor")
const scripts_to_single_md = require("./src/transformers/scripts_to_single_md")
const MDscripts_to_pdf = require("./src/transformers/MDscripts_to_pdf")
const analyseInputPath = require("./src/helpers/analyseInputPath")

const path = require("path")
const fs = require("fs")

const print = x => console.log(x)
// file.isDirectory()

/*

There are 3 types of input / output for text_transformer 

INPUT: root_folder ->  selected files in level 0 (no subfolders)
    example: translate texts 

INPUT: root_folder -> all folders in level 0 (no subfolders)
    example: create pdf from various script projects. Every folder will correspond to a new pdf

INPUT: root_folder -> all recursive files (with subfolders) 
    example: create pdf book from .md recursive file structure

*/

const path_check = input => {
  if (!fs.existsSync(input)) {
    let msg = `⚠️  This folder doesn't exist. \n Please input an **existing** folder / directory:\n `
    input = readlineSync.question(msg)
    return path_check(input)
  }

  const stats = fs.statSync(input)

  if (!stats.isDirectory()) {
    let msg = `⚠️  Your input is not of type "FOLDER / DIRECTORY". \nPlease input an a *FOLDER / DIRECTORY* (not a file):\n `
    input = readlineSync.question(msg)
    return path_check(input)
  }

  return input
}

function analyse_path(input) {
  const stats = fs.statSync(input)
  if (stats.isDirectory()) {
    console.log(input)

    console.log("IS DIRECTORY")
    return { input, type: "directory" }
  }

  if (stats.isFile()) {
    console.log("IS FILE")

    return { input, type: "file" }
  }
}

const processScriptsToSingeMd = optionsInput => {
  const selectedProcess = "scripts_to_single_md"
  msg = `\nThese are the default filter options.`
  console.log(msg)

  const folderAnalytics = analyseInputPath(optionsInput)

  myTextProcessor = new TextProcessor(optionsInput, folderAnalytics, selectedProcess)

  const aa = myTextProcessor.Processes[selectedProcess]
  console.log({ aa })
  const outputFolderPath = optionsInput.inputPath + myTextProcessor.Processes[selectedProcess].folder_output_ext

  console.log("myTextProcessor.rootFolder", myTextProcessor.rootFolder)

  const outputFileName = myTextProcessor.rootFolder + myTextProcessor.Processes[selectedProcess].file_output_name_ext

  options_output = {
    outputFolder: outputFolderPath,
    outputFilename: outputFileName
  }

  console.log(options_output)

  scripts_to_single_md(optionsInput, options_output)

  fileName = options_output.outputFilename
  saveFilePath = path.join(options_output.outputFolder, fileName)
  MDscripts_to_pdf(saveFilePath)
}

const main = () => {
  let msg = `\nWelcome to file transformer. Please provide with an input FOLDER.\n (you may drag & drop on the terminal) \n`

  let mypath = readlineSync.question(msg)
  let inputPath = path_check(mypath)

  console.log("Your FOLDER input is registered:", inputPath)

  msg = `\n\nWhat would you like to do?
        1. 📁 SCRIPTS    -to-    SINGLE MD
        2. MANY MDs     -to-    SINGLE MD

        (please type 1 or 2)\n\n
    `

  input = readlineSync.question(msg)

  const processes_array = ["scripts_to_single_md", "mds_to_single_md"]
  const selectedProcess = processes_array[Number(input) - 1]

  console.log("You selected", selectedProcess)

  /* Deconstruction of folderAnalytics 

     { rootFolder,
        entries_root_folder,
        files_of_root_folder,
        files_recursive } */

  const optionsInput = {
    inputPath: inputPath,
    excluded_extensions: ["DS_Store", "gitignore", "ico", "jpg", "png", "svg"],
    excluded_folders: ["node_modules", "excluded", ".git", "archive", "styles"],
    excluded_files: ["package-lock.json", "yarn.lock"]
  }

  processScriptsToSingeMd(optionsInput)
}

main()
