const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a+b);
            } else {
                reject('Use only numbers');
            }
        }, 1500);
    });
};

asyncAdd(5,'9').then((result) => {
    console.log(`Result: ${result}`);
    return asyncAdd(result, 34);
}).then((result) => {
    console.log(`Result2: ${result}`);
}).catch((errorMessage) => {
    console.log(errorMessage)
});

// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("It Worked!");
//     }, 2000);
// });

// somePromise.then((message) => {
//     console.log('Success: ' + message);
// }, (error) => {
//     console.log('Error: ' + error);
// });