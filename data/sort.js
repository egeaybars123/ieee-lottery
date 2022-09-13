const file = require("./participants.json");
let participants = file.participants.sort();
let randomNumber = 423804932740204923740049127409370532409375092430974n;

function determineWinners(prizeNumber) {
    let winners = [];
    for (let i = 0; i < prizeNumber; i++) {
        const winnerIndex = randomNumber % BigInt(participants.length);
        winners.push(participants[winnerIndex]);
        participants.splice(Number(winnerIndex), 1);
        console.log(participants);
        randomNumber >>= 1n;
    }

    return winners;
}

console.log(participants);
const winners = determineWinners(1); //verilecek ödül sayısı prizeNumber parametresine yazılıyor.
console.log(winners);