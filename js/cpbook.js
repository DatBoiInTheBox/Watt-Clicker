// js/cpbook.js

function generateBuyers(){

    buyers = []

    for(let i = 0; i < buyerSlots; i++){
        buyers.push(generateBuyer())
    }

}

generateBuyers()

function openCPBook(){

    document.getElementById("cpbookApp").classList.remove("hidden")

    // if buyers somehow isn't an array, fix it
    if(!Array.isArray(buyers)){
        buyers = []
    }

    // if no buyers exist, generate them
    if(buyers.length === 0){
        generateBuyers()
    }

    displayCPBook()
}

function closeCPBook(){
    document.getElementById("cpbookApp").classList.add("hidden")
}

function displayCPBook(){

    const feed = document.getElementById("buyers")

    feed.innerHTML = ""

    if(!Array.isArray(buyers)){
        console.error("buyers is not an array:", buyers)
        return
    }

    buyers.forEach((buyer, index)=>{

        const card = document.createElement("div")
        card.className = "buyer-card"

        card.innerHTML = `
            <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%">
            <h3>${buyer.name}</h3>
            <p>Needs: ${formatCP(buyer.requiredCP)}</p>
            <p>Payout: $${buyer.payout.toLocaleString()}</p>
            <button onclick="sellToBuyer(${index})">Sell</button>
        `

        feed.appendChild(card)

    })

}

function sellToBuyer(index){

    const buyer = buyers[index]

    if(cp >= buyer.requiredCP){

        cp -= buyer.requiredCP
        money += buyer.payout

        updateUI()

        // replace the buyer
        buyers[index] = generateBuyer()

        displayCPBook()

    }else{

        alert("Not enough CP!")

    }

}

card.innerHTML = `
    <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%">
    <h3>${buyer.name}</h3>
    <p>Needs: ${formatCP(buyer.requiredCP)}</p>
    <p>Payout: $${buyer.payout.toLocaleString()}</p>
    <button onclick="sellToBuyer(${index})">Sell</button>
`;

generateBuyers()