let names = []
let portraits = []

let currentBuyer = null

async function loadNames(){

    let response = await fetch("data/names.txt")

    let text = await response.text()

    names = text.split("\n")

}

function randomName(){

    return names[Math.floor(Math.random()*names.length)]

}

function randomPortrait(){

    let number = Math.floor(Math.random()*10)+1

    return "portraits/p"+number+".jpg"

}

function generateBuyer(){

    let requirement = Math.floor(Math.random()*200)+50

    let payout = requirement * (1 + Math.random()*2)

    currentBuyer = {

        name: randomName(),
        portrait: randomPortrait(),
        requirement: requirement,
        payout: Math.floor(payout)

    }

    displayBuyer()

}

function displayBuyer(){

    let feed = document.getElementById("buyerFeed")

    feed.innerHTML = ""

    let card = document.createElement("div")
    card.className = "buyer-card"

    card.innerHTML = `

        <img src="${currentBuyer.portrait}">

        <h3>${currentBuyer.name}</h3>

        <p>Requesting ${currentBuyer.requirement} CP</p>

        <p>Payout: $${currentBuyer.payout}</p>

        <button class="sellButton" onclick="sellToBuyer()">Sell</button>

    `

    feed.appendChild(card)

}

function sellToBuyer(){

    if(cp >= currentBuyer.requirement){

        cp -= currentBuyer.requirement

        money += currentBuyer.payout

        updateUI()

        generateBuyer()

    }else{

        alert("Not enough CP!")

    }

}
