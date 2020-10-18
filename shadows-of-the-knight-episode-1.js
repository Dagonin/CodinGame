// https://www.codingame.com/training/medium/shadows-of-the-knight-episode-1

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // width of the building.
const H = parseInt(inputs[1]); // height of the building.
const N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
let X0 = parseInt(inputs[0]);
let Y0 = parseInt(inputs[1]);
let RelativeX = X0;
let RelativeY = Y0;
let map = [];

function GenerateMap(x, y) {
    map = [];
    for (let i = 0; i < x; i++) {
        map.push([1]);
        for (let ii = 0; ii < y; ii++) {
            map[i][ii] = 'a';

        }

    }

}


function CutMap(dir) {
    let x = map.length;
    let y = map[0].length;
    if (dir == "U") {
        GenerateMap(1, Y0);
        SetDirections("", 'neg')
    }
    if (dir == "UR") {
        GenerateMap(x - RelativeX, RelativeY);
        SetDirections("pos", 'neg')
    }
    if (dir == "R") {
        GenerateMap(x - RelativeX, 1);
        SetDirections("pos", '')
    }
    if (dir == "DR") {
        GenerateMap(x - RelativeX, y - RelativeY );
        SetDirections("pos", 'pos')
    }

    if (dir == "D") {
        GenerateMap(1, y - RelativeY);
        SetDirections("", 'pos')
    }
    if (dir == "DL") {
        GenerateMap(x - RelativeX, y - RelativeY );
        SetDirections("neg", 'pos')
    }
    if (dir == "L") {
        GenerateMap(x - RelativeX, 1);
        SetDirections("neg", '')
    }
    if (dir == "UL") {
        GenerateMap(x - RelativeX, y - RelativeY );
        SetDirections("neg", 'neg')
    }


}

function SetDirections(st, ed) {
    RelativeX = Math.round(map.length / 2);
    RelativeY = Math.round(map[0].length / 2);
    console.error(map)
    if (st == "pos") {
        X0 += RelativeX;
    } else if (st == "neg") {
        X0 -= RelativeX;
    }
    if (ed == "pos") {
        Y0 += RelativeY;
    } else if (ed == "neg") {
        Y0 -= RelativeY;
    }


}

GenerateMap(W, H);


// game loop
while (true) {
    const bombDir = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    CutMap(bombDir)
    // console.error(map, bombDir)
    console.log(X0, Y0);
}