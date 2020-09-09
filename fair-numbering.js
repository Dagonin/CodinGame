// https://www.codingame.com/training/medium/fair-numbering

const N = parseInt(readline());
function NumCount(num) {
    let control;
    let size;
    let sum = 0;
    while (num > 0) {
        size = num.toString().length;
        control = num - Math.pow(10, size - 1) + 1;
        sum += control * size;
        num = num - control;
    }
    return sum;

}

function ReverseCount(num) {
    let size = 0;
    let BigNumber = 0;
    let control = 0;
    let LastControl;
    while (num > control) {
        LastControl = control;
        control += Math.pow(10, size) * 9 * (size + 1);
        BigNumber += Math.floor(Math.pow(10, size - 1) * 9);
        size++;
    }
    num = num - LastControl;
    return BigNumber + Math.floor((num / size));
}



for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const st = parseInt(inputs[0]);
    const ed = parseInt(inputs[1]);
    let nums = NumCount(ed) - NumCount(st);
    let allNums = (nums / 2) + NumCount(st);
    let Val = ReverseCount(allNums);
    let Left;
    let Right;
    if (st == Val) {
        Left = Val.toString().length;
    } else {
        Left = NumCount(Val) - NumCount(st);
        Left = Left + st.toString().length;
    }
    Right = NumCount(ed) - NumCount(Val);
    if (Right < Left) {
        Val--;
    }
    console.log(Val);
}