const path = require("path")
const { getFilesRecursive } = require("./src/getfiles")

const print = x => console.log(x)
print("Hello")

path_init = path.dirname("")
path_search = path.join(path_init, "static")
print({ path_search })
bb = getFilesRecursive(path_search)
console.log(bb)
