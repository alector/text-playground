const path = require("path")
const { existsSync, readFileSync, copyFileSync, appendFileSync } = require("fs")
fs = require('fs');


const main = (input_file, output_file) => {

    const myText = readFileSync(input_file, "utf-8")
    FlashCardsFinal = myText.split("\n").map(el => {
            const LeftCard = el.split("\t")[0] + " ... "
            const RightCard = el.split("\t")[1]
            // reverse & repeat 
            return RightCard + "\t" + LeftCard.repeat(6)

        }


    )
    console.log(FlashCardsFinal)
    finalTxt = FlashCardsFinal.join("\n")
    fs.writeFileSync(output_file, finalTxt, 'utf-8');


}


input = "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/flashcards01/vocab_fr_en_01.txt"

output = "/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/flashcards01/vocab_fr_en_01_reversed.txt"

main(input, output)