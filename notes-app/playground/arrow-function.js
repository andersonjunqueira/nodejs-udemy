// let square = (x) => {
//     let result = x*x;
//     return result;
// };

//let square = (x) => x*x;

//let square = x => x*x;

let user = {
    name: 'Anderson',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi I'm ${this.name}`);
    }, 
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi I'm ${this.name}`);
    }
}

console.log(user.sayHiAlt(1,2,3));