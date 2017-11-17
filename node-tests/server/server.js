const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.status(200).send([
        { name: 'User1', age: 25 },
        { name: 'User2', age: 29 },
        { name: 'User3', age: 41 }
    ]);
});

app.listen(3000);

module.exports.app = app;