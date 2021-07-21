const writeFileSyncRecursive = require('./writeFileSyncRecursive')

const myname = (x) => console.log('My name is' + x)
const mysurname = (x) => console.log('My surname is' + x)
const mysplit = (txt) => {
	const re = /\,|\.|\|/

	return txt.split(re)
}

if (require.main === module) {
	myname('George')
	mysurname('Peterson')
	const text = 'blabla,blibli.blabla|blibli'
	const b = mysplit(text)
	console.log(b)

	newPath =
		'/Users/panos/PPCode/GitBox-web/node-playground-GITHUB/text-playground/static/scripts/book-demo/blabla.md'

	writeFileSyncRecursive(newPath, 'hello world', 'utf8')
}

module.exports = { myname, mysurname }
