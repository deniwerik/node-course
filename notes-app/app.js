/*
const add = require('./utils.js')

const sum = add(1,3)

console.log(sum)*/

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//console.log(chalk.red.bold.inverse('Error!'));

//console.log(process.argv)

// customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        //console.log('adding a new note', argv)
        //console.log('title:' + argv.title + ' body:' + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        //console.log('removing a note')
        //let message = notes.removeNote(argv.title)
        notes.removeNote(argv.title)
        /*if (message) {
            console.log(chalk.green.inverse('note removed!'))
        } else {
            console.log(chalk.red.inverse('no note found'))
        }*/
    }
})

// read
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('reading a note')
        notes.readNote(argv.title)
    }
})

// list
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        //console.log('listing notes')
        notes.listNotes()
    }
})


// add, remove, read, list
yargs.parse()
//console.log(yargs.argv)

