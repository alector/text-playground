const path = require("path")
const { getFilesRecursive } = require("./src/getfiles")

const print = x => console.log(x)
print("Hello")

base_path = path.dirname("")
static_path = path.join(base_path, "static")
print({ static_path })
allfiles = getFilesRecursive(static_path)
console.log(allfiles)
