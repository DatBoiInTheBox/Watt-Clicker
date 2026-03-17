// js/walmart.js

// Storage upgrades list
const storageUpgrades = [
    { name: "Onn Flash Drive 500MB",   increase: 500,    cost: 5,     img: "portraits/wm1.png" },
    { name: "Onn Flash Drive 2GB",   increase: 2000,    cost: 10,    img: "portraits/wm2.png" },
    { name: "Onn Flash Drive 8GB",   increase: 8000,    cost: 20,    img: "portraits/wm3.png" },
    { name: "Onn Storage Drive 256GB", increase: 256000,  cost: 100,   img: "portraits/wm4.png" },
    { name: "Onn Storage Drive 512GB", increase: 512000,  cost: 200,   img: "portraits/wm5.png" },
    { name: "Onn Storage Drive 1TB",   increase: 1024000, cost: 500,   img: "portraits/wm6.png" },
    { name: "Onn Server Storage 2TB",  increase: 2048000, cost: 1000,  img: "portraits/wm7.png" },
    { name: "Onn Server Storage 5TB",  increase: 5120000, cost: 2500,  img: "portraits/wm8.png" }
];

// Add a simple click effect for menu buttons (they don't do anything)
document.querySelectorAll(".w-menu-btn").forEach(btn=>{
    btn.onclick = ()=> alert("This section is coming soon!");
});
// Track purchased upgrades
let purchasedStorage = storageUpgrades.map(u => 0);

window.addEventListener("load", function() {
    window.openWalmart = function() {
        const app = document.getElementById("walmartApp");
        if (app) app.classList.remove("hidden");
        if (window.displayWalmart) window.displayWalmart();
    };
    window.closeWalmart = function() {
        const app = document.getElementById("walmartApp");
        if (app) app.classList.add("hidden");
    };
});

window.displayWalmart = function() {
    const list = document.getElementById("storageList");
    list.innerHTML = "";

    storageUpgrades.forEach((upgrade, index)=>{
        const div = document.createElement("div");
        div.className = "storage-card";
        div.innerHTML = `
            <img src="${upgrade.img}" alt="${upgrade.name}" style="width:100%;border-radius:5px;margin-bottom:5px;">
            <h3>${upgrade.name}</h3>
            <p>Cost: $${upgrade.cost.toLocaleString()}</p>
            <p>Increase Storage: +${upgrade.increase} MB</p>
            <p>Owned: ${purchasedStorage[index]}</p>
            <button onclick="buyStorage(${index})">Buy</button>
        `;
        list.appendChild(div);
    });
};

window.buyStorage = function(index){
    const upgrade = storageUpgrades[index];
    if(money >= upgrade.cost){
        money -= upgrade.cost;
        maxCP += upgrade.increase;
        purchasedStorage[index]++;
        updateUI();
        displayWalmart();
    } else {
        alert("Not enough money!");
    }
};