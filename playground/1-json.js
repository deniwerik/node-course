const fs = require('fs')

/*
const book = {
    title: 'ego is the enemy',
    author: 'ryan holiday'
}

const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json', bookJSON)*/

//const dataBuffer = fs.readFileSync('1-json.json')
//console.log(dataBuffer)

//const dataJson = dataBuffer.toString()
//console.log(dataJson)

//const data = JSON.parse(dataJson)

//console.log(data.title)

const file = fs.readFileSync('1-json.json')
let jsonData = file.toString()
const data = JSON.parse(jsonData)

data.name = 'deni'
data.age = 34

jsonData = JSON.stringify(data)

fs.writeFileSync('1-json.json', jsonData)