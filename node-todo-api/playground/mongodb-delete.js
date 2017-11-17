const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // delete many
    db.collection('Todos').deleteMany({text: 'Todo 2'}).then((result) => {
        console.log(result);
    })

    delete one
    db.collection('Todos').deleteOne({_id: new ObjectID('59f8a25d816369c2b3db71e1')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })
    
    // db.close();
});