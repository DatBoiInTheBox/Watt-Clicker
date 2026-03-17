// js/homedepot.js

// --- Upgrades ---
const upgrades = [
    { name: "Logitech C270", cost: 15, production: 1, portrait: "pr1" },
    { name: "Renewed Smartphone", cost: 120, production: 5, portrait: "pr2" },
    { name: "DJI Action 5 Pro", cost: 450, production: 15, portrait: "pr3" },
    { name: "Nikon COOLPIX P900", cost: 900, production: 40, portrait: "pr4" },
    { name: "Z50II", cost: 2200, production: 120, portrait: "pr5" },
    { name: "4K Sony Camera", cost: 5000, production: 450, portrait: "pr6" },
    { name: "Traficker", cost: 15000, production: 1500, portrait: "pr7" }, // MB/sec
    { name: "Production Member", cost: 45000, production: 5000, portrait: "pr8" },
    { name: "Full Production Crew", cost: 75000, production: 12000, portrait: "pr9" },
    { name: "AI Optimization", cost: 250000, production: 50000, portrait: "pr10" },
    { name: "AI Production", cost: 800000, production: 250000, portrait: "pr11" },
    { name: "Global Network", cost: 2500000, production: 1000000, portrait: "pr12" },
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