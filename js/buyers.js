// js/buyers.js

window.buyerSlots = 1;    // global variable
window.buyers = [];       // global array

window.names = [
    "Jason Reed",
    "Chris Parker",
    "Ryan Adams",
    "Daniel Carter",
    "Tyler Brooks",
    "Aaron Hayes",
    "James Walker",
    "Nathan Cooper",
    "Michael Harris",
    "Lucas Turner"
];

// Generate a single buyer
window.generateBuyer = function() {
    let requiredCP = Math.floor(Math.random() * 800000) + 100;
    let multiplier = Math.random() * 3 + 0.5;
    let payout = Math.floor(requiredCP * multiplier);

    return {
        name: names[Math.floor(Math.random() * names.length)],
        portrait: "portraits/" + (Math.floor(Math.random() * 10) + 1) + ".png",
        requiredCP: requiredCP,
        payout: payout
    };
};

// Generate buyers for all slots
window.generateBuyers = function() {
    buyers = [];
    for (let i = 0; i < buyerSlots; i++) {
        buyers.push(generateBuyer());
    }
};

// Initialize buyers immediately
generateBuyers();

// -------------------
// UTILITY FUNCTIONS
// -------------------

// pick a random name from the array
function randomName(){
    return names[Math.floor(Math.random() * names.length)];
}

// pick a random portrait from portraits folder
function randomPortrait(){
    let number = Math.floor(Math.random() * 10) + 1;
    return "portraits/" + number + ".png";
}

// generate a single buyer
window.generateBuyer = function() {
    // ensure storage exists
    let minRequest = Math.floor(maxCP * 0.01); // 1% of storage
    let maxRequest = maxCP;                     // max is your storage
    let requiredCP = Math.floor(Math.random() * (maxRequest - minRequest + 1)) + minRequest;

    let multiplier = Math.random() * 2 + 0.5;
    let payout = Math.floor(requiredCP * multiplier);

    return {
        name: names[Math.floor(Math.random() * names.length)],
        portrait: "portraits/" + (Math.floor(Math.random() * 10) + 1) + ".png",
        requiredCP: requiredCP,
        payout: payout
    };
};

// generate buyers for all slots
function generateBuyers(){
    buyers = [];
    for(let i = 0; i < buyerSlots; i++){
        buyers.push(generateBuyer());
    }
}

// -------------------
// CPBook APP FUNCTIONS
// -------------------

// open CPBook app
function openCPBook(){
    document.getElementById("cpbookApp").classList.remove("hidden");
    displayCPBook();
}

// close CPBook app
function closeCPBook(){
    document.getElementById("cpbookApp").classList.add("hidden");
}

// display all buyers in the CPBook feed
function displayCPBook(){
    let feed = document.getElementById("buyers");
    feed.innerHTML = "";

    buyers.forEach((buyer, index)=>{
        let card = document.createElement("div");
        card.className = "buyer-card";

        card.innerHTML = `
            <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%">
            <h3>${buyer.name}</h3>
            <p>Needs: ${formatCP(buyer.requiredCP)}</p>
            <p>Payout: $${buyer.payout}</p>
            <button onclick="sellToBuyer(${index})">Sell</button>
        `;

        feed.appendChild(card);
    });
}

// sell CP to a buyer
function sellToBuyer(index){
    let buyer = buyers[index];

    if(cp >= buyer.requiredCP){
        cp -= buyer.requiredCP;
        money += buyer.payout;
        updateUI();

        // replace this buyer with a new random buyer
        buyers[index] = generateBuyer();
        displayCPBook();
    }else{
        alert("Not enough CP!");
    }
}

// -------------------
// INITIALIZE BUYERS
// -------------------

generateBuyers(); // generate at least one buyer when the game loads