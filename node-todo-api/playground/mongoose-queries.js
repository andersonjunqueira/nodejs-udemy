const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

//let id = '59f9a860ef6d1203831dcf31';
//let id = '69f9a860ef6d1203831dcf31';
// let id = '59f9a860ef6d1203831dcf311';

// if(!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo: ', todo)
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID: ', todo)
// }).catch((e) => console.log(e));

let userid = '59f9978d6978a16ac669eeec';

User.findById(userid).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log('User with ID: ');
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
