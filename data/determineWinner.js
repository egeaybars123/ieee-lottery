const file = require("./participants.json");
let participants = file.participants; //names are already sorted 

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

const winners = determineWinners(1); //verilecek ödül sayısı prizeNumber parametresine yazılıyor.
console.log(winners);