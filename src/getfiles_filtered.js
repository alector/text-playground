const path = require("path")
const { getFilesRecursive, getFoldersRecursive } = require("./getfiles")



getSplitPath = path => {
    // on linux & Mac path is separated by / (example /path/to/folder)
    // on windows path is separated by \ (example \path\to\folder)
    // This regular expression splits path in both ways
    const re = /\/|\\/
    return path.split(re)
}

const commonElementExist = (array1, array2) => {
    for (const el of array1) {
        if (array2.includes(el)) {
            return true
        }
    }

    return false
}

getFilesRecursiveFiltered = (inputPath, excluded_extensions, excluded_folders) => {
    const allEntries = getFilesRecursive(inputPath)

    const filtered1 = allEntries.map(entry => {
        const path = entry.path
        const cur_path = path.replace(inputPath, "")
        const cur_split_path = getSplitPath(cur_path)
        cur_split_path.pop()
        const parent_folder = cur_split_path[cur_split_path.length - 1]
        const depth_level = cur_split_path.length

        return { depth_level, parent_folder, name: entry.name, path: entry.path, filename: entry.filename, ext: entry.ext, cur_path, cur_split_path }
    })



    const filtered2 = filtered1.filter(entry => {

        const approved_extension = !excluded_extensions.includes(entry.ext)
        const approved_folder = !commonElementExist(entry.cur_split_path, excluded_folders)

        console.log("entry.ext", entry.ext, { approved_extension })

        console.log({ approved_folder })

        return (approved_extension && approved_folder)
    })

    console.log(filtered2)


}




if (require.main === module) {
    console.log("=======================================\n")

    const excluded_extensions = ["DS_Store", "json", "gitignore", "ico"]
    const excluded_folders = ["node_modules"]

    const input = "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks"
    getFilesRecursiveFiltered(input, excluded_extensions, excluded_folders)
}


module.exports = getFilesRecursiveFiltered