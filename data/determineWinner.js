const fs = require("fs");
const sha256 = require("js-sha256");
const list = require("./participants.json");
const hashed_list = require("./hashed_participants.json");
let participants = list.participants; //names are already sorted 

//see README.md for contract address to verify if only one random number was generated
let randomNumber = 85290794060654921317835833063858394501722124600352799389211813127908428858699n;


function determineWinners(prizeNumber) {
    let winners = [];
    for (let i = 0; i < prizeNumber; i++) {
        const winnerIndex = randomNumber % BigInt(participants.length);
        winners.push(participants[winnerIndex]);
        participants.splice(Number(winnerIndex), 1);
        console.log(participants.length);
        randomNumber >>= 1n;
    }

    return winners;
}

//credits to umut-er (github) for coming up with the idea of hashing participants
//to ensure privacy and transparency for the lottery.
function privateListGenerator() {

    let hashed = {
        list: []
    }

   participants.forEach(item => {
        item = item.toLowerCase();
        hashed.list.push(sha256.sha256(item))
   })

    const data = JSON.stringify(hashed);

    fs.writeFile('data/hashed_participants.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    
}

const winners = determineWinners(1); //verilecek ödül sayısı prizeNumber parametresine yazılıyor.
console.log(winners);

privateListGenerator();

