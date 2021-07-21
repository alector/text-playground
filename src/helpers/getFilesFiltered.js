const path = require("path")
const { getFilesRecursive, getFoldersRecursive } = require("./getfiles")

// find common elements in two arrays

const hasCommonElements = (array1, array2) => {
  filteredArray = array1.filter(value => array2.includes(value))
  return !!filteredArray.length // true or false
}

getSplitPath = path => {
  // on linux & Mac path is separated by / (example /path/to/folder)
  // on windows path is separated by \ (example \path\to\folder)
  // This regular expression splits path in both ways
  const re = /\/|\\/
  return path.split(re)
}

// const commonElementExist = (array1, array2) => {
//     for (const el of array1) {
//         if (array2.includes(el)) {
//             return true
//         }
//     }

//     return false
// }

getFilesFiltered = options => {
  const top_folder = getSplitPath(options.inputPath).pop()
  const allEntries = getFilesRecursive(options.inputPath)

  const filtered1 = allEntries.map(entry => {
    const path = entry.path
    const relative_path = path.replace(options.inputPath, "")
    const relative_split_path = getSplitPath(relative_path)
    relative_split_path.pop()
    const depth_level = relative_split_path.length - 1

    const parent_folder = depth_level == 0 ? top_folder : relative_split_path[relative_split_path.length - 1]

    return {
      depth_level,
      parent_folder,
      name: entry.name,
      full_path: entry.path,
      filename: entry.filename,
      ext: entry.ext,
      relative_path,
      relative_split_path
    }
  })

  const filtered2 = filtered1.filter(entry => {
    excluded_extensions = options.excluded_extensions
    excluded_folders = options.excluded_folders
    excluded_files = options.excluded_files

    const approved_extension = !excluded_extensions.includes(entry.ext)
    // const approved_folder = !commonElementExist(entry.relative_split_path, excluded_folders)

    // relative_split_path should not have ANY element that is also in excluded_folders
    // const approved_folder = !excluded_folders.includes(entry.parent_folder)

    const approved_folder = !hasCommonElements(excluded_folders, entry.relative_split_path)

    const approved_file = !excluded_files.includes(entry.name)

    return approved_extension && approved_folder && approved_file
  })

  return [top_folder, filtered2]
}

if (require.main === module) {
  const options = {
    inputPath: "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/french",
    excluded_extensions: ["DS_Store", "gitignore", "ico"],
    excluded_folders: ["node_modules", ".git"],
    excluded_files: ["README.md", "package-lock.json"]
  }

  const [top_folder, filtered_results] = getFilesFiltered(options)
  console.log(filtered_results)
}

module.exports = getFilesFiltered
