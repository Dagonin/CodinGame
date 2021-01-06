/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
const X0 = parseInt(inputs[0]);
const Y0 = parseInt(inputs[1]);
let Cy = 0; // (H - Y0) /2
let Cx = 0; // (W - X0) /2
let BatY = Y0;
let BatX = X0;
// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    if (Cy == 0 && Cx == 0) {

        if (bombDir.includes("U")) {
            Cy = Math.floor((Y0) / 2);
        } else {
            Cy = Math.floor((H - Y0) / 2);
        }

        if (bombDir.includes("L")) {
            Cx = Math.floor((X0) / 2);
        } else {
            Cx = Math.floor((W - X0) / 2);
        }
    }


    if (bombDir.includes("U")) {
        BatY = BatY - Cy;
    }
    if (bombDir.includes("R")) {
        BatX = BatX + Cx;
    }
    if (bombDir.includes("D")) {
        BatY = BatY + Cy;
    }
    if (bombDir.includes("L")) {
        BatX = BatX - Cx;
    }
    console.error(BatX, BatY, Cx, Cy)
    console.log(BatX, BatY);
    Cx = Math.round(Cx / 2);
    Cy = Math.round(Cy / 2);
}
