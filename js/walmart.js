// js/walmart.js

// ---------------------------
// STORAGE UPGRADES
// ---------------------------
const storageUpgrades = [
    { name: "Onn Flash Drive 500MB",   baseCost: 5,     increase: 500,    img: "portraits/wm1.png" },
    { name: "Onn Flash Drive 2GB",     baseCost: 150,    increase: 2000,   img: "portraits/wm2.png" },
    { name: "Onn Flash Drive 8GB",     baseCost: 600,    increase: 8000,   img: "portraits/wm3.png" },
    { name: "Onn Storage Drive 256GB", baseCost: 1600,   increase: 256000, img: "portraits/wm4.png" },
    { name: "Onn Storage Drive 512GB", baseCost: 2000,   increase: 512000, img: "portraits/wm5.png" },
    { name: "Onn Storage Drive 1TB",   baseCost: 5000,   increase: 1024000,img: "portraits/wm6.png" },
    { name: "Onn Server Storage 2TB",  baseCost: 10000,  increase: 2048000,img: "portraits/wm7.png" },
    { name: "Onn Server Storage 5TB",  baseCost: 25000,  increase: 5120000,img: "portraits/wm8.png" }
];

// price scaling
const STORAGE_COST_MULTIPLIER = 1.15;

// owned count
let purchasedStorage = storageUpgrades.map(() => 0);

// ---------------------------
// COST CALC
// ---------------------------
function getStorageCost(index) {
    const base = storageUpgrades[index].baseCost;
    const owned = purchasedStorage[index];
    return Math.floor(base * Math.pow(STORAGE_COST_MULTIPLIER, owned));
}

// ---------------------------
// SAVE / LOAD HOOKS
// ---------------------------
window.getWalmartSave = function() {
    return {
        purchasedStorage: purchasedStorage
    };
};

window.loadWalmartSave = function(data) {
    if (!data) return;

    if (data.purchasedStorage) {
        purchasedStorage = data.purchasedStorage;

        // rebuild maxCP from scratch
        maxCP = 1000;
        storageUpgrades.forEach((u, i) => {
            maxCP += u.increase * purchasedStorage[i];
        });
    }
};

// ---------------------------
// OPEN / CLOSE
// ---------------------------
window.addEventListener("load", function() {
    window.openWalmart = function() {
        const app = document.getElementById("walmartApp");
        if (app) app.classList.remove("hidden");
        displayWalmart();
    };

    window.closeWalmart = function() {
        const app = document.getElementById("walmartApp");
        if (app) app.classList.add("hidden");
    };
});

// ---------------------------
// DISPLAY
// ---------------------------
window.displayWalmart = function() {
    const list = document.getElementById("storageList");
    list.innerHTML = "";

    storageUpgrades.forEach((upgrade, index) => {
        const cost = getStorageCost(index);

        const div = document.createElement("div");
        div.className = "storage-card";

        div.innerHTML = `
            <img src="${upgrade.img}" style="width:100%;border-radius:5px;margin-bottom:5px;">
            <h3>${upgrade.name}</h3>
            <p>Cost: $${cost.toLocaleString()}</p>
            <p>Increase Storage: +${upgrade.increase} MB</p>
            <p>Owned: ${purchasedStorage[index]}</p>
            <button onclick="buyStorage(${index})">Buy</button>
        `;

        list.appendChild(div);
    });
};

// ---------------------------
// BUY
// ---------------------------
window.buyStorage = function(index){
    const cost = getStorageCost(index);

    if(money >= cost){
        money -= cost;

        purchasedStorage[index]++;
        maxCP += storageUpgrades[index].increase;

        updateUI();
        displayWalmart();
    } else {
        alert("Not enough money!");
    }
};