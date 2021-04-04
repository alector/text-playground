let readlineSync = require("readline-sync")
const path = require("path")
const fs = require("fs")

const print = x => console.log(x)
// file.isDirectory()

const path_check = input => {
    if (!fs.existsSync(input)) {

        let msg = `⚠️  Please input an existing file:\n `
        input = readlineSync.question(msg)
        return path_check(input)

    } else {
        return input
    }
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



function main() {
    let msg = `\nWelcome to file transformer. Please provide with an input file or folder.\n`

    let mypath = readlineSync.question(msg)
    const input = path_check(mypath)
    console.log("final", input)
    const obj1 = analyse_path(input)


}

main()