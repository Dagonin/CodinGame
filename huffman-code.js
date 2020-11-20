// https://www.codingame.com/ide/puzzle/huffman-code


const n = parseInt(readline());
var inputs = readline().split(' ');
let freq = [];
for (let i = 0; i < n; i++) {
    const wi = parseInt(inputs[i]);
    freq.push(wi);
}



while (freq.length > 1) {
    freq.sort(function (a, b) { return a - b; })
    freq[1] = [freq[0], freq[1]];
    freq.shift();
    console.error(freq)

}

// freq.forEach(a=>{
//     console.error(typeof a)
// })


function count(n){

    console.error(typeof n);


}

count(freq[0][0][0][0][0]);

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(freq.entries());
