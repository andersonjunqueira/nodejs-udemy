const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

require('./config/config.js');
let { mongoose } = require('./db/mongoose.js');
let { Todo } = require('./models/todo.js');
let { User } = require('./models/user.js');
let { authenticate } = require('./middleware/authenticate.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then(
        (doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then(
        (todos) => {
            res.send({todos});
        }, (e) => {
            res.status(400).send(e);
        });
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(
        (todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        }, (e) => {
            res.status(400).send();
        });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(
        (todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        }, (e) => {
            res.status(400).send();
        });
});

app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { 
        $set: body 
    }, { 
        new: true 
    })
    .then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err, res) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    User.findByCredentials(req.body.email, req.body.password).then( (user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, (e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};