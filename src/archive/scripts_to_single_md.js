getFilesRecursiveFiltered = require("./getfiles_filtered");
printFileTree = require("./printFileTree");
const path = require("path");
const fs = require("fs");

const scripts_to_single_md = (options) => {
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

    const finalArray = [];
    const fileTreeTxt = printFileTree(options);

    const entries = getFilesFiltered(options);

    const Title = entries[0].parent_folder;
    finalArray.push(`# 📁 ${Title}`);
    finalArray.push(`\n## Contents`);
    finalArray.push(`\n\`\`\`\n${fileTreeTxt}\n\`\`\``);

    for (el of entries) {
        console.log({ el });

        fileText = fs.readFileSync(el.full_path, "utf8");

        finalArray.push(`\n## ${el.name}`);
        finalArray.push(`\n> ${el.relative_path}`);

        finalArray.push(`\n\`\`\`${el.ext}\n${fileText}\n\`\`\``);
    }

    const final_content = finalArray.join("\n");

    if (fs.existsSync(options.outputFolder)) {
        fileName = options.outputFilename + ".md";
        saveFilePath = path.join(options.outputFolder, fileName);

        fs.writeFileSync(saveFilePath, final_content);
    }
};

if (require.main === module) {
    const options = {
        inputPath:
            "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks",
        outputFolder:
            "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks-pdf",
        outputFilename: "final",
        excluded_extensions: ["DS_Store", "gitignore", "ico"],
        excluded_folders: ["node_modules"],
        excluded_files: ["README.md", "package-lock.json"],
    };

    script_files_to_md(options);
}

module.exports = scripts_to_single_md;
