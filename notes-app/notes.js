const fs = require('fs');

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const logNote = (note) => {
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

const getAll = () => {
    return fetchNotes();
};

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = { title, body };
    
    let duplicateNotes = notes.filter((n) => n.title === note.title);
    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((n) => n.title === title);
    return filteredNotes[0];
};

const removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((n) => n.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    getAll, addNote, getNote, removeNote, logNote
}