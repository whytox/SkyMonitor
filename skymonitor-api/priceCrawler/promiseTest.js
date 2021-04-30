
const numbers = [1,2,3,4];

squarePromise(numbers)
.then(res => console.log(res));

//randNumPromise(10).then(res => console.log(res));

randNumPromise(3).
then(res => {console.log(res); return res;}).
then(squarePromise)
.then(res => console.log(res));

function squarePromise(numbers) {
    return new Promise((resolve, reject) => {
        var squared = numbers.map(n => n * n);
        resolve(squared);
    });
}

function randNumPromise(n) {
    return new Promise((resolve, reject) => {
        var randomNums = [];
        while (randomNums.length < n)
            randomNums.push(Math.random());
        resolve(randomNums);
    })
}