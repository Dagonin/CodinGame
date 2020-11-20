/**
 * https://www.codingame.com/ide/challenge/fall-challenge-2020
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/


let PotionArray = [];
let CastArray = [];
let Myinv = [];
let choosenBrewId = 0;
let actionList = [];

// DO ZMIANY~!!!
let DeltaTime = [0.5, 1, 2, 3];






// game loop
while (true) {
    const actionCount = parseInt(readline()); // the number of spells and recipes in play
    for (let i = 0; i < actionCount; i++) {
        var inputs = readline().split(' ');
        const actionId = parseInt(inputs[0]); // the unique ID of this spell or recipe
        const actionType = inputs[1]; // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
        const delta0 = parseInt(inputs[2]); // tier-0 ingredient change
        const delta1 = parseInt(inputs[3]); // tier-1 ingredient change
        const delta2 = parseInt(inputs[4]); // tier-2 ingredient change
        const delta3 = parseInt(inputs[5]); // tier-3 ingredient change
        const price = parseInt(inputs[6]); // the price in rupees if this is a potion
        const tomeIndex = parseInt(inputs[7]); // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax; For brews, this is the value of the current urgency bonus
        const taxCount = parseInt(inputs[8]); // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell; For brews, this is how many times you can still gain an urgency bonus
        const castable = inputs[9] !== '0'; // in the first league: always 0; later: 1 if this is a castable player spell
        const repeatable = inputs[10] !== '0'; // for the first two leagues: always 0; later: 1 if this is a repeatable player spell
        let obj = {
            id: actionId,
            type: actionType,
            used: castable,
            price: price,
            d0: delta0,
            d1: delta1,
            d2: delta2,
            d3: delta3,
        }
        if (actionType == 'BREW') {
            PotionArray.push(obj);
        } else if (actionType == "CAST") {
            CastArray.push(obj);
        }
    }
    for (let i = 0; i < 2; i++) {
        var inputs = readline().split(' ');
        const inv0 = parseInt(inputs[0]); // tier-0 ingredients in inventory
        const inv1 = parseInt(inputs[1]);
        const inv2 = parseInt(inputs[2]);
        const inv3 = parseInt(inputs[3]);
        const score = parseInt(inputs[4]); // amount of rupees
        if (i == 0) {
            Myinv = [inv0, inv1, inv2, inv3];
        }
    }

    // PotionArray.sort((a, b) => (a.price < b.price) ? 1 : -1);



    // PotionArray.forEach((Potion)=>{
    //     findALL(Potion.d0,Potion.d1,Potion.d2,Potion.d3,Potion.price)

    // })
    GetBrew();



    // in the first league: BREW <id> | WAIT; later: BREW <id> | CAST <id> [<times>] | LEARN <id> | REST | WAIT
    // console.log(`BREW ${PotionArray[0].id}`);
    // console.error(PotionArray);
    // console.error(CastArray);





    PotionArray = [];
    CastArray = [];
    Myinv = [];
    // console.log("BREW 1")
}



// Gets id of best Potion to brew
function GetBrew() {
    let BestPotion = 0;
    let PrevResult = 0;
    PotionArray.forEach((Potion, i) => {
        let delta = [Myinv[0] + Potion.d0, Myinv[1] + Potion.d1, Myinv[2] + Potion.d2, Myinv[3] + Potion.d3]
        let time = 0;

        delta.forEach((d, i) => {
            if (d < 0) {
                time -= d * DeltaTime[i];
            }
        })

        if (PrevResult < Potion.price / time) {
            PrevResult = Potion.price / time;
            BestPotion = i;
        }
    })
    choosenBrewId = BestPotion;

    let cast = ingridient();
    if (cast != "READY") {
        if (CastArray.find(el => el.id == cast).used == true) {
            console.log(`CAST ${cast}`);
        } else {
            console.log("REST")
        }

    } else {
        console.log(`BREW ${PotionArray[BestPotion].id}`)
        choosenBrewId = 0;
    }


}

// Returns what we need right now
function ingridient() {
    let Potion = PotionArray[choosenBrewId];
    let delta = [Myinv[0] + Potion.d0, Myinv[1] + Potion.d1, Myinv[2] + Potion.d2, Myinv[3] + Potion.d3];

    if (delta[3] >= 0 && delta[2] >= 0 && delta[1] >= 0 && delta[0] >= 0) {
        return "READY";
    } else {
        if (delta[3] < 0) {
            return getD3();
        } else if (delta[2] < 0) {
            return getD2();
        } else if (delta[1] < 0) {
            return getD1();
        } else {
            return CastArray.find(el=>el.d0>0).id;;
        }
    }

}



function getD3() {
    let delta = [Myinv[0], Myinv[1], Myinv[2]];
    let cast;
    if (delta[2] != 0) {
        cast = CastArray.find(el=>el.d3>0).id;;
    } else if (delta[1] != 0) {
        cast = CastArray.find(el=>el.d2>0).id;;
    } else if (delta[0] != 0) {
        cast = CastArray.find(el=>el.d1>0).id;;
    } else {
        cast = CastArray.find(el=>el.d0>0).id;;
    }
    return cast;
}

function getD2() {
    let delta = [Myinv[0], Myinv[1]];
    let cast;
    if (delta[1] != 0) {
        cast = CastArray.find(el=>el.d2>0).id;;
    } else if (delta[0] != 0) {
        cast = CastArray.find(el=>el.d1>0).id;;
    } else {
        cast = CastArray.find(el=>el.d0>0).id;;
    }
    return cast;
}

function getD1() {
    let delta = [Myinv[0]];
    let cast;
    if (delta[0] != 0) {
        cast = CastArray.find(el=>el.d1>0).id;;
    } else {
        cast = CastArray.find(el=>el.d0>0).id;;
    }
    return cast;
}

// Count how much rounds it takes to create 1 ingridient
// function GetTime(delta){

//     CastArray.forEach((cast)=>{
//         let Spellcount = 0;
//         if(cast.d3>0){
//             Spellcount++;
//             console.error(cast);
//         }

//     })


// }