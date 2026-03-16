// js/homedepot.js

// --- Upgrades ---
const upgrades = [
    { name: "Poloroid Camera", cost: 10, production: 5, portrait: "pr1" },
    { name: "1080p Camera", cost: 20, production: 12, portrait: "pr2" },
    { name: "Samsung Phone", cost: 100, production: 60, portrait: "pr3" },
    { name: "4k Camera", cost: 200, production: 150, portrait: "pr4" },
    { name: "GoPro", cost: 1000, production: 500, portrait: "pr5" },
    { name: "IPhone 17", cost: 5000, production: 2350, portrait: "pr6" },
    { name: "Production Agency", cost: 7500, production: 5000, portrait: "pr7" }, // MB/sec
    { name: "Boat Party", cost: 10000, production: 7500, portrait: "pr8" }
];

let purchasedUpgrades = upgrades.map(u => 0);

/// js/homedepot.js
window.addEventListener("load", function() {
    const audio = document.getElementById("depotAudio");
    window.openDepot = function() {
        const app = document.getElementById("depotApp");
        if (app) app.classList.remove("hidden");
        if (audio) { audio.currentTime = 0; audio.play().catch(e => console.log(e)); }
        if (window.displayDepot) window.displayDepot();
    };
    window.closeDepot = function() {
        const app = document.getElementById("depotApp");
        if (app) app.classList.add("hidden");
        if (audio) { audio.pause(); audio.currentTime = 0; }
    };
});

// --- Display Upgrades ---
function displayDepot(){
    const list = document.getElementById("upgradeList");
    list.innerHTML = "";

    upgrades.forEach((upgrade, index) => {
        const div = document.createElement("div");
        div.className = "upgrade-card";

        // Display portrait
        let imgTag = `<img src="portraits/${upgrade.portrait}.png" 
                        style="width:60px;height:60px;border-radius:50%;margin-right:10px;">`;

        div.innerHTML = `
            <div style="display:flex;align-items:center">
                ${imgTag}
                <div>
                    <h3>${upgrade.name}</h3>
                    <p>Cost: $${upgrade.cost.toLocaleString()}</p>
                    <p>Production: +${upgrade.production} MB/sec</p>
                    <p>Owned: ${purchasedUpgrades[index]}</p>
                    <button onclick="buyUpgrade(${index})">Buy</button>
                </div>
            </div>
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