const path = require('path')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const Prince = require('prince')
const util = require('util')

var showdown = require('showdown')

const htmlResult = ''
const htmlTemplate = [
    `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossorigin="anonymous"
        />

<style type="text/css">

    @page {
        @bottom {
            content: counter(page)
        }
    }

@media print {
    h2 {
       page-break-before: always;

    }
    .number {
    background:#ccc;
    border-radius: 5px;
    padding:2px;

    }
    xmp {
        white-space: pre-wrap;
        font-family: "Monaco"; 
        font-size:14px;
    }

    pre {
        white-space: pre-wrap;
        font-family: "Monaco"; 
        font-size:14px;

    }

    code {
        font-family: "Monaco"; 
        font-size:14px;

    }

blockquote p {
    text-align:center;
    margin-left:0;
    margin-right:0;
    font-size:20px;
    border:1px solid black;
    width:100%;
}
}

h2, blockquote {
font-family: Arial, Helvetica, sans-serif;
    text-align:center;

}

.fas,
            .far {
                margin-right: 5px;
            }
            .folder {
                margin-bottom:5px;
                font-weight: bold;
            }

            .file {
                padding-left: 0.3rem;
                                margin-bottom:5px;

            }

            .x {
                margin-left: 1rem;
            }

            .xx {
                margin-left: 2rem;
            }

            .xxx {
                margin-left: 3rem;
            }

         .xxxx {
                margin-left: 4rem;
            }

            .xxxxx {
                margin-left: 5rem;
            }

            .xxxxxx {
                margin-left: 6rem;
            }


</style>
</head>
<body>  `,
    `
</body>
</html>
`,
]

function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}

const script_to_pdf = (inputPath) => {
    // create proper output names

    // const htmlName = options.inputPath + ".html"
    const MarkdownName = path.basename(inputPath)
    const htmlName = MarkdownName.replace('.md', '.html')
    const pdfName = MarkdownName.replace('.md', '.pdf')

    const parentPath = path.dirname(inputPath)
    const htmlPath = path.join(parentPath, htmlName)
    const pdfPath = path.join(parentPath, pdfName)

    // const pdfName = options.outputFilename + '.pdf'
    // const outputFolderHtml = path.join(options.outputFolder, htmlName)

    // process markdown into html
    let markdown_data = fs.readFileSync(inputPath, 'utf8')
    markdown_data = replaceAll(markdown_data, '📁', '[-]')

    // const md = new MarkdownIt()

    const converter = new showdown.Converter()

    const htmlResult = converter.makeHtml(markdown_data)

    // let htmlResult = md.render(markdown_data)
    // let htmlResult1 = htmlResult.replace("<pre><code", "<xmp")

    // let htmlResult1 = replaceAll(htmlResult, "<pre><code", "<xmp")
    // let htmlResult2 = replaceAll(htmlResult1, '</code></pre>', '</xmp>')

    // let htmlResult2 = htmlResult1.replace('</code></pre>', '</xmp>')

    const final = htmlTemplate[0] + htmlResult + htmlTemplate[1]

    // save html in output folder
    fs.writeFileSync(htmlPath, final)

    // convert html to pdf
    Prince()
        .inputs(htmlPath)
        .output(pdfPath)
        .execute()
        .then(
            function () {
                console.log('OK: done. PDF created!')
            },
            function (error) {
                console.log('Prince ERROR: ', util.inspect(error))
            }
        )
}

if (require.main === module) {
    const markdownPath =
        '/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/008_-_videos-hooks_t_script_md/008_-_videos-hooks_combined.md'

    script_to_pdf(markdownPath)
}

module.exports = script_to_pdf
