const fs = require("fs")
const getFilesFiltered = require("./getFilesFiltered")

/*
  options_filter = {
        inputPath: inputPath,
        excluded_extensions: ['DS_Store', 'gitignore', 'ico'],
        excluded_folders: ['node_modules'],
        excluded_files: ['README.md', 'package-lock.json'],
    }

*/

const analyseInputPath = optionsInput => {
  const [rootFolder, files_recursive] = getFilesFiltered(optionsInput)
  // console.log(entries);

  const entries_root_folder = fs.readdirSync(optionsInput.inputPath, {
    withFileTypes: true
  })

  const folders_of_root_folder = entries_root_folder
    .filter(folder => folder.isDirectory())
    .map(folder => {
      return {
        name: folder.name
      }
    })

  const files_of_root_folder = entries_root_folder
    .filter(file => !file.isDirectory())
    .map(file => {
      return {
        name: file.name
      }
    })

  return {
    rootFolder,
    entries_root_folder,
    files_of_root_folder,
    files_recursive
  }
}

if (require.main === module) {
  options_filter = {
    inputPath: "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/french",
    excluded_extensions: ["DS_Store", "gitignore", "ico"],
    excluded_folders: ["node_modules", ".git"],
    excluded_files: ["README.md", "package-lock.json"]
  }

  const demo = analyseInputPath(options_filter)
  console.log(demo)
}

module.exports = analyseInputPath
