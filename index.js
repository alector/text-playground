const path = require("path")
const { getFilesRecursive, getFoldersRecursive } = require("./src/getfiles")

const print = x => console.log(x)
print("Hello")

base_path = path.dirname("")
static_path = path.join(base_path, "static")
print({ static_path })

// DO NOT REMOVE!!!
// allfiles = getFilesRecursive(static_path)
// console.log(allfiles)

allfolders = getFoldersRecursive(static_path)
console.log({ allfolders })
