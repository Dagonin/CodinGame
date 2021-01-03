//  https://www.codingame.com/ide/puzzle/next-growing-number

let n = readline();
n++;
let isGrowing = false;
let Digits = [];
Digits = n.toString().split('');
let RestNums;
Digits.forEach((element, i) => {
    if (i != 0 && !RestNums) {
        if (Digits[i] >= Digits[i - 1]) {
        } else {
            Digits[i] = Digits[i - 1];
            RestNums = Digits[i];
        }
    } else if (i != 0) {
        Digits[i] = RestNums;
    }
});
console.log(Digits.join(""))
