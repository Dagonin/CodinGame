// https://www.codingame.com/training/medium/skynet-revolution-episode-1

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways
let Links = []; // Array of Links
let UsedLinks = []; // Array of arrays of Links used in calculating path 
let CutLinks = []; // Array of cut links
let Gateways = [];
let control; // Random uncut link
for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
    Links.push([N1, N2]);
}
for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
    Gateways.push(EI);
}

//Returns all awaible Links excluding used ones. (UsedLinks)
function NearbyLinks(Node, Agent) {
    let paths = [];
    Links.forEach(Link => {
        if ((Link[0] == Node || Link[1] == [Node]) && JSON.stringify(UsedLinks).indexOf(JSON.stringify(Link)) == -1) {
            paths.push(Link);
            UsedLinks.push(Link);
        }
    })
    return paths;
}

// Returns link to cut
function PathFinder(Gateway, Agent) {
    let cut;
    let paths = NearbyLinks(Gateway, Agent);
    console.error(paths)
    paths.forEach(path => {
        if (path[0] == Agent || path[1] == Agent) {
            cut = path;
            return;
        }

    })
    if (!cut) {
        cut = "a";
    }
    control = paths[0];
    return cut;

}

// game loop
while (true) {
    const SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn
    let CutLink = "a";
    Gateways.forEach(gate => {
        let val = PathFinder(gate, SI);
        if (val != "a") {
            CutLink = val;
        }

    })
    if (CutLink == "a") {
        CutLink = control;
    }
    console.log(CutLink[0], CutLink[1])
    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    UsedLinks = [];

    // Example: 0 1 are the indices of the nodes you wish to sever the link between

}