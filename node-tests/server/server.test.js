const request = require('supertest');
const expect = require('expect');

let app = require('./server.js').app;

describe('Server', () => {

    describe('#root', () => {

        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body)
                        .toInclude({
                            error: 'Page not found.'
                        });
                })
                .end(done);
        });

    });

    describe('#users', () => {

        it('should check user exists', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body)
                        .toInclude({name: 'User2', age: 29});
                })
                .end(done);
        });
        
    });
});
