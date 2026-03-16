// js/homedepot.js

// --- Upgrades ---
const upgrades = [
    { name: "Security Camera", cost: 1000, production: 5 },
    { name: "CP Collector", cost: 5000, production: 25 },
    { name: "Video Camera", cost: 50000, production: 200 },
    { name: "Production Agency", cost: 500000, production: 2000 }, // MB/sec
    { name: "Boat Party", cost: 5000000, production: 20000 }
];

let purchasedUpgrades = upgrades.map(u => 0);

// --- Open / Close App ---
function openDepot(){
    document.getElementById("depotApp").classList.remove("hidden");
    displayDepot();
}

function closeDepot(){
    document.getElementById("depotApp").classList.add("hidden");
}

// --- Display Upgrades ---
function displayDepot(){
    const list = document.getElementById("upgradeList");
    list.innerHTML = "";

    upgrades.forEach((upgrade, index) => {
        const div = document.createElement("div");
        div.className = "upgrade-card";

        div.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>Cost: $${upgrade.cost.toLocaleString()}</p>
            <p>Production: +${upgrade.production} MB/sec</p>
            <p>Owned: ${purchasedUpgrades[index]}</p>
            <button onclick="buyUpgrade(${index})">Buy</button>
        `;

        list.appendChild(div);
    });
}

// --- Buy Upgrade ---
function buyUpgrade(index){
    const upgrade = upgrades[index];

    if(money >= upgrade.cost){
        money -= upgrade.cost;
        purchasedUpgrades[index]++;
        production += upgrade.production;
        updateUI();
        displayDepot();
    }else{
        alert("Not enough money!");
    }
}