const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    // check if email exists

    // save user to database
    db.saveUser({ email, password });

    // send the welcome email
};