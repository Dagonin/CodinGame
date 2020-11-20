// https://www.codingame.com/ide/puzzle/code-vs-zombies

// game loop
while (true) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const humanCount = parseInt(readline());
    let humanArr = [];
    let zombieArr = [];
    let coordinates = [];
    for (let i = 0; i < humanCount; i++) {
        var inputs = readline().split(' ');
        const humanId = parseInt(inputs[0]);
        const humanX = parseInt(inputs[1]);
        const humanY = parseInt(inputs[2]);
        humanArr.push([humanX, humanY])
    }
    const zombieCount = parseInt(readline());
    for (let i = 0; i < zombieCount; i++) {
        var inputs = readline().split(' ');
        const zombieId = parseInt(inputs[0]);
        const zombieX = parseInt(inputs[1]);
        const zombieY = parseInt(inputs[2]);
        const zombieXNext = parseInt(inputs[3]);
        const zombieYNext = parseInt(inputs[4]);
        zombieArr.push([zombieX, zombieY])
    }

    humanArr.forEach(human => {


        zombieArr.forEach(zombie => {

            let d = Math.sqrt(Math.pow(human[0] - zombie[0], 2) + Math.pow(human[1] + zombie[1], 2));
            let obj = {
                distance: d,
                x: human[0],
                y: human[1]
            }
            coordinates.push(obj);
        })




    })

    coordinates = coordinates.sort((a, b) => (a.distance > b.distance) ? 1 : -1)




    //Sorting Function



    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    console.log(coordinates[0].x,coordinates[0].y);     // Your destination coordinates

}
