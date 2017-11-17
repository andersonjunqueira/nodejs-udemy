const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {

    describe('#add', () => {

        it('should add 2 numbers', () => {
            let res = utils.add(33, 11);
            expect(res)
                .toBeA('number')
                .toBe(44, `Expected 44, got ${res}`);
        });

    });
    
    it('should square a number', () => {
        let res = utils.square(3);
        expect(res)
            .toBeA('number')
            .toBe(9, `Expected 9, got ${res}`);
    });
    
    it('should have first and last names', () => {
        let u = utils.setFullName({}, 'Anderson Junqueira');
        expect(u)
            .toInclude({
                firstName: 'Anderson',
                lastName: 'Junqueira'   
            });
    });
    
});
