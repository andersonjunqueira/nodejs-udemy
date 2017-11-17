const expect = require('expect');
const rewire = require('rewire');

let app = rewire('./app');

describe('App', () => {

    let db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('Should call the spy correctly', () => {
        let spy = expect.createSpy();
        spy('Anderson', 41);
        expect(spy).toHaveBeenCalledWith('Anderson', 41);
    });

    it('Should call save user with user object', () => {
        let email = 'anderson.junqueira@gmail.com';
        let password = '123abc';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });

});