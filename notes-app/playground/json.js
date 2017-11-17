// let obj = {
//     name: "Anderson"
// };
// let stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// let personString = '{"name":"Anderson","age":25}';
// let person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title: 'some title',
    body: 'some body'
};
let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString); 

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(originalNoteString);

console.log(typeof originalNote);
console.log(originalNote);
console.log(typeof originalNoteString);
console.log(originalNoteString);

console.log(typeof noteString);
console.log(noteString);
console.log(typeof note);
console.log(note);