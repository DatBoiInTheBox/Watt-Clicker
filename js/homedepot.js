// js/homedepot.js

// --- Upgrades ---
const upgrades = [
    { name: "Logitech C270", baseCost: 15, production: 1, portrait: "pr1" },
    { name: "Renewed Smartphone", baseCost: 120, production: 5, portrait: "pr2" },
    { name: "DJI Action 5 Pro", baseCost: 450, production: 15, portrait: "pr3" },
    { name: "Nikon COOLPIX P900", baseCost: 900, production: 40, portrait: "pr4" },
    { name: "Z50II", baseCost: 2200, production: 120, portrait: "pr5" },
    { name: "4K Sony Camera", baseCost: 5000, production: 450, portrait: "pr6" },
    { name: "Traficker", baseCost: 15000, production: 1500, portrait: "pr7" },
    { name: "Production Member", baseCost: 45000, production: 5000, portrait: "pr8" },
    { name: "Full Production Crew", baseCost: 75000, production: 12000, portrait: "pr9" },
    { name: "AI Optimization", baseCost: 250000, production: 50000, portrait: "pr10" },
    { name: "AI Production", baseCost: 800000, production: 250000, portrait: "pr11" },
    { name: "Global Network", baseCost: 2500000, production: 1000000, portrait: "pr12" },
];

// how fast price increases per purchase
const COST_MULTIPLIER = 1.15;

let purchasedUpgrades = upgrades.map(() => 0);

// ---------------------------
// COST CALCULATION
// ---------------------------
function getUpgradeCost(index) {
    const base = upgrades[index].baseCost;
    const owned = purchasedUpgrades[index];
    return Math.floor(base * Math.pow(COST_MULTIPLIER, owned));
}

// ---------------------------
// LOAD / SAVE HOOK
// ---------------------------
window.getUpgradeSave = function() {
    return {
        purchasedUpgrades: purchasedUpgrades
    };
};

window.loadUpgradeSave = function(data) {
    if (!data) return;

    if (data.purchasedUpgrades) {
        purchasedUpgrades = data.purchasedUpgrades;

        // recalc production from scratch
        production = 1;
        upgrades.forEach((u, i) => {
            production += u.production * purchasedUpgrades[i];
        });
    }
};

// ---------------------------
// OPEN / CLOSE
// ---------------------------
window.addEventListener("load", function() {
    const audio = new Audio("sounds/hdt.mp3");

    window.openDepot = function() {
        const app = document.getElementById("depotApp");
        if (app) app.classList.remove("hidden");

        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));

        displayDepot();
    };

    window.closeDepot = function() {
        const app = document.getElementById("depotApp");
        if (app) app.classList.add("hidden");

        audio.pause();
        audio.currentTime = 0;
    };
});

// ---------------------------
// DISPLAY
// ---------------------------
function displayDepot(){
    const list = document.getElementById("upgradeList");
    list.innerHTML = "";

    upgrades.forEach((upgrade, index) => {
        const cost = getUpgradeCost(index);

        const div = document.createElement("div");

        // Strong product-card look (Home Depot inspired)
        div.style.background = "linear-gradient(180deg, #ff8c00, #ff6a00)";
        div.style.border = "2px solid #c14400";
        div.style.borderRadius = "14px";
        div.style.padding = "14px";
        div.style.marginBottom = "12px";
        div.style.boxShadow = "0 8px 18px rgba(0,0,0,0.35)";
        div.style.color = "#fff";
        div.style.fontFamily = "Arial, sans-serif";
        div.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";

        // Hover effect
        div.onmouseover = () => {
            div.style.transform = "translateY(-3px) scale(1.02)";
            div.style.boxShadow = "0 12px 24px rgba(0,0,0,0.45)";
        };
        div.onmouseout = () => {
            div.style.transform = "none";
            div.style.boxShadow = "0 8px 18px rgba(0,0,0,0.35)";
        };

        let imgTag = `<img src="portraits/${upgrade.portrait}.png" 
            style="
                width:70px;
                height:70px;
                border-radius:12px;
                margin-right:12px;
                border:3px solid #fff;
                background:#fff;
                object-fit:cover;
            ">`;

        div.innerHTML = `
            <div style="display:flex;align-items:center">
                ${imgTag}
                <div style="flex:1">
                    <h3 style="margin:0 0 6px 0;font-size:19px;letter-spacing:0.5px;">
                        ${upgrade.name}
                    </h3>

                    <div style="background:rgba(0,0,0,0.2);padding:8px 10px;border-radius:8px;margin-bottom:8px;">
                        <p style="margin:2px 0;"><b>Cost:</b> $${cost.toLocaleString()}</p>
                        <p style="margin:2px 0;"><b>Production:</b> +${upgrade.production} MB/sec</p>
                        <p style="margin:2px 0;"><b>Owned:</b> ${purchasedUpgrades[index]}</p>
                    </div>

                    <button onclick="buyUpgrade(${index})" 
                        style="
                            width:100%;
                            padding:9px;
                            background:#111;
                            color:#fff;
                            border:none;
                            border-radius:8px;
                            cursor:pointer;
                            font-weight:bold;
                            letter-spacing:0.5px;
                            text-transform:uppercase;
                        ">
                        Buy Now
                    </button>
                </div>
            </div>
        `;

        list.appendChild(div);
    });
}

// ---------------------------
// BUY
// ---------------------------
function buyUpgrade(index){
    const cost = getUpgradeCost(index);

    if(money >= cost){
        money -= cost;

        purchasedUpgrades[index]++;
        production += upgrades[index].production;

        updateUI();
        displayDepot();
    } else {
        alert("Not enough money!");
    }
}