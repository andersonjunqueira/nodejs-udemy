const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Lunch',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection("Todos").find({
    //     _id: new ObjectID('59f8a25d816369c2b3db71e1')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection("Todos").find().count().then((count) => {
    //     console.log(`Todos ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection("Users").find({name: 'Anderson Junqueira'}).count().then((count) => {
    //     console.log(`Users ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch users', err);
    // });    

    db.close();
});