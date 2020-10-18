// https://www.codingame.com/training/medium/skynet-revolution-episode-2

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways
let Links = []; // Array of Links
let UsedLinks = []; // Array of arrays of Links used in calculating path 
let CutLinks = []; // Array of cut links
let Gateways = [];
let LinksToCheck = [];
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
function NearbyLinks(Node) {
    let paths = [];
    Links.forEach(Link => {
        if ((Link[0] == Node || Link[1] == [Node]) && JSON.stringify(UsedLinks).indexOf(JSON.stringify(Link)) == -1 && JSON.stringify(CutLinks).indexOf(JSON.stringify(Link)) == -1) {
            paths.push(Link);
            UsedLinks.push(Link);
        }
    })
    return paths;
}

// Returns link to cut
function PathFinder(Agent) {
    let index = 0;
    let LayerIndex = 0;
    let ThisLayer = 1;
    let NextLayer = 0;
    let LinksThisLayer = [];
    let cut = [];
    let loop = true;
    LinksToCheck.push(Agent);
    while (loop == true) {
        index++;

        let paths = NearbyLinks(LinksToCheck[0]);
        paths.forEach(path => {
            // console.error(Agent, path)
            if (Gateways.find(e => e == path[0]) != undefined || Gateways.find(e => e == path[1]) != undefined) {
                cut.push(path);
            } else {
                UsedLinks.push(path)
                if (path[0] == LinksToCheck[0]) {
                    LinksToCheck.push(path[1]);
                } else {
                    LinksToCheck.push(path[0]);
                }

            }

        })

        // console.error(ThisLayer,index,LayerIndex,paths)

        // Counting distance of Links to cut from Agent

        NextLayer += paths.length;

        if (cut.length != 0) {
            cut.forEach(p=>{
                let obj = {
                    a: p[0],
                    b: p[1],
                    Layer: LayerIndex,
                    Links: cut.length
                }
                
                LinksThisLayer.push(obj)
            })
            

        }

        if (ThisLayer == index) {
            LayerIndex++;
            ThisLayer = NextLayer;
            NextLayer = 0;

        }



        LinksToCheck.shift();
        if (LinksToCheck.length == 0) {
            loop = false;
        }
        cut = [];
    }

    // Selecting link to cut
    let LinkToCut;
    let LinksAmount = 0;
    let LowestLayer = LinksThisLayer[0].Layer;
    LinksThisLayer.forEach((l, i) => {
        if(l.Links>LinksAmount && LowestLayer==l.Layer){
            LinksAmount = l.Links;
            LinkToCut = [l.a,l.b]
        }
        // console.error(l)
    })

   
    return LinkToCut;
}




// game loop
while (true) {
    const SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn
    let cut = PathFinder(SI);
    console.error(CutLinks)
    console.log(cut[0],cut[1])
    CutLinks.push([cut[0],cut[1]])
    // console.log(cut[0], cut[1]);
    UsedLinks = [];
    LinksToCheck = [];
    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // Example: 0 1 are the indices of the nodes you wish to sever the link between

}