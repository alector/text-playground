const getFilesFiltered = require('./../helpers/getFilesFiltered')
const printFileTreeHtml = require('./../helpers/printFileTreeHtml')
const path = require('path')
const fs = require('fs')

const scripts_to_single_md = (options_input, options_output) => {
    /*
    {
        depth_level: 0,
        parent_folder: '008_-_videos-hooks',
        name: 'README.md',
        full_path: '/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks/README.md',
        filename: 'README.md',
        ext: 'md',
        relative_path: '/README.md',
        relative_split_path: [ '' ]
      },
    */

    const finalArray = []
    const fileTreeHtml = printFileTreeHtml(options_input)
    console.log({ options_input })
    const [rootFolder, entries] = getFilesFiltered(options_input)
    console.log({ entries })
    const Title = entries[0].parent_folder
    finalArray.push(`<h1><i class="fas fa-code"></i>  ${Title}</h1>`)
    finalArray.push(`\n## Contents`)
    finalArray.push(`\n\n${fileTreeHtml}\n\n`)

    for (el of entries) {
        console.log({ el })
        console.log(el)
        fileText = fs.readFileSync(el.full_path, 'utf8')

        finalArray.push(`\n## ${el.name}`)
        finalArray.push(`\n> ${el.relative_path}`)

        finalArray.push(`\n\`\`\`${el.ext}\n${fileText}\n\`\`\``)
    }

    const final_content = finalArray.join('\n')

    if (!fs.existsSync(options_output.outputFolder)) {
        fs.mkdirSync(options_output.outputFolder)
    }

    fileName = options_output.outputFilename
    saveFilePath = path.join(options_output.outputFolder, fileName)

    fs.writeFileSync(saveFilePath, final_content)
}

if (require.main === module) {
    const options_input = {
        inputPath:
            '/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks',
        excluded_extensions: ['DS_Store', 'gitignore', 'ico', 'png', 'svg'],
        excluded_folders: ['node_modules', 'build'],
        excluded_files: ['README.md', 'package-lock.json'],
    }

    const options_output = {
        outputFolder:
            '/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks-pdf',
        outputFilename: 'final.md',
    }

    scripts_to_single_md(options_input, options_output)
}

module.exports = scripts_to_single_md
