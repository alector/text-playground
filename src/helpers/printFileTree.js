getFilesRecursiveFiltered = require('./getFilesFiltered')

const printFileTree = (options) => {
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

    const [topFolder, entries] = getFilesFiltered(options)

    let previous_parent_folder = ''
    const FinalArray = []
    for (const file of entries) {
        if (file.parent_folder != previous_parent_folder) {
            str1 = '\t'.repeat(file.depth_level) + '📁 ' + file.parent_folder
            FinalArray.push(str1)
            str2 = '\t'.repeat(file.depth_level) + '    ' + file.name
            FinalArray.push(str2)

            // console.log(str1)
            // console.log(str2)

            previous_parent_folder = file.parent_folder
        } else {
            str3 = '\t'.repeat(file.depth_level) + '    ' + file.name
            FinalArray.push(str3)

            // console.log(str3)
        }
    }

    return FinalArray.join('\n')
}

if (require.main === module) {
    const options = {
        inputPath:
            '/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks',
        excluded_extensions: ['DS_Store', 'gitignore', 'ico'],
        excluded_folders: ['node_modules'],
        excluded_files: ['README.md', 'package-lock.json'],
    }

    const fileTree = printFileTree(options)
    console.log(fileTree)
}

module.exports = printFileTree
