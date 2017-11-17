const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const yo = {
    title: {
        describe: 'The note title',
        demand: 'true',
        alias: 't'
    }, 
    body: {
        describe: 'The note boby',
        demand: 'true',
        alias: 'b'
    }
};

const argv = yargs
    .command('add', 'Add a new note', { title: yo.title, body: yo.body })
    .command('list', 'Show all notes', {})
    .command('read', 'Add a note', { title: yo.title })
    .command('remove', 'Remove a note', { title: yo.title })
    .help()
    .argv;

let command = argv._[0];
if(command === 'list') {

    let allNotes = notes.getAll();
    console.log(`Printing: ${allNotes.length} notes`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
    
} else if(command === 'add') {

    let note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log('Note added');
        notes.logNote(note);
    } else {
        console.log('Note not added: duplicate title');
    }

} else if(command === 'read') {

    let note = notes.getNote(argv.title);
    if(note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
    
} else if(command === 'remove') {

    let removed = notes.removeNote(argv.title);
    console.log(removed ? 'Note removed' : 'Note not existent');
    
} else {
    console.log("comando não reconhecido");
}