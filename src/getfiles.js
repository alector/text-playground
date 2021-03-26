const path = require("path")
const fs = require("fs")

const print = x => console.log(x)

exports.getFilesRecursive = cur_path => {
  // find all ENTRIES = FILES + FOLDERS in current path
  const entries = fs.readdirSync(cur_path, { withFileTypes: true })
  print({ cur_path })

  // isolate the FILES from the ENTRIES in current path
  const files = entries
    .filter(file => {
      return !file.isDirectory()
    })
    .map(file => {
      filename = file.name
      extension = filename.split(".").pop()
      filepath = path.join(cur_path, file.name)
      return { ...file, path: filepath, filename, ext: extension }
    })

  // isolate the FOLDERS from the ENTRIES in current path
  const folders = entries.filter(folder => folder.isDirectory())

  for (const folder of folders) {
    console.log(folder) // { folder: Dirent { name: 'test-folder', [Symbol(type)]: 2 } }

    dirPath = path.join(cur_path, folder.name)
    files.push(...this.getFilesRecursive(dirPath))
  }

  return files
}

exports.getFoldersRecursive = cur_path => {
  // find all ENTRIES = FILES + FOLDERS in current path
  // print({ cur_path })

  const entries = fs.readdirSync(cur_path, { withFileTypes: true })
  // print({ entries })

  // isolate the FOLDERS from the ENTRIES in current path

  const folders = entries
    .filter(folder => folder.isDirectory())
    .map(folder => {
      parentpath = cur_path
      foldername = folder.name
      folderpath = path.join(parentpath, foldername)
      return {
        parentpath,
        foldername,
        folderpath
      }
    })

  // print({ folders })

  for (const folder of folders) {
    folders.push(...this.getFoldersRecursive(folder.folderpath))
  }

  return folders
}