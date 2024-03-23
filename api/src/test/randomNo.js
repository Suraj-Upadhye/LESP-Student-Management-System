function getRandomIntInclusive() {
    let min = Math.ceil(1);
    let max = Math.floor(500);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomIntInclusive = getRandomIntInclusive();
console.log(randomIntInclusive);
