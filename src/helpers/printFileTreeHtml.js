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

    /*
        <div class="filetree">
            <div class="folder">
                <span class="fas fa-folder"></span>Folder 1
            </div>
            <div class="file xx">
                <span class="far fa-file-alt"></span>file 1
            </div>
            <div class="file xx">
                <span class="far fa-file-alt"></span>file 2
            </div>
            <div class="folder xx">
                <span class="fas fa-folder"></span>Folder 1
            </div>
            <div class="file xxx">
                <span class="far fa-file-alt"></span>file 1
            </div>
            <div class="file xxx">
                <span class="far fa-file-alt"></span>file 2
            </div>
        </div>
    
*/

    const [topFolder, entries] = getFilesFiltered(options)

    let previous_parent_folder = ''
    const FinalArray = []
    for (const file of entries) {
        if (file.parent_folder != previous_parent_folder) {
            cssClass = 'x'.repeat(file.depth_level + 1)
            folderName = file.parent_folder

            htmlLine = `<div class="folder ${cssClass}"><span class="fas fa-folder"></span>${folderName}</div>`
            FinalArray.push(htmlLine)

            cssClass = 'x'.repeat(file.depth_level + 1)
            fileName = file.name

            htmlLine = `<div class="file ${cssClass}"><span class="far fa-file-alt"></span>${fileName}</div>`
            FinalArray.push(htmlLine)

            // console.log(str1)
            // console.log(str2)

            previous_parent_folder = file.parent_folder
        } else {
            cssClass = 'x'.repeat(file.depth_level + 1)
            fileName = file.name

            htmlLine = `<div class="file ${cssClass}"><span class="far fa-file-alt"></span>${fileName}</div>`
            FinalArray.push(htmlLine)
            // console.log(str3)
        }
    }

    return `<div class="filetree">${FinalArray.join('\n')}</div>`
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
