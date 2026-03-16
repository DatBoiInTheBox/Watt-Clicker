// js/game.js

window.cp = 0;
window.money = 0;
window.maxCP = 1000;
window.production = 1;
window.buyerSlots = 1;
window.buyerSlotCost = 20;
// js/game.js
window.cp = cp;
window.money = money;
window.maxCP = maxCP;
window.buyerSlots = buyerSlots;
window.buyerSlotCost = buyerSlotCost;
window.updateUI = updateUI;
window.formatCP = formatCP;
// ---------------------------
// FORMAT CP nicely (MB, GB, TB, etc.)
// ---------------------------
function formatCP(value) {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + " EX";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + " PB";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + " TB";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + " GB";
    return value + " MB";
}

// ---------------------------
// UPDATE UI function
// ---------------------------
function updateUI() {
    const cpEl = document.getElementById("cp");
    const storageEl = document.getElementById("storage");
    const moneyEl = document.getElementById("money");
    const slotEl = document.getElementById("slotCount");
    const slotCostEl = document.getElementById("slotCost");

    const globalCP = document.getElementById("globalCP");
    const globalStorage = document.getElementById("globalStorage");
    const globalMoney = document.getElementById("globalMoney");
    const globalSlots = document.getElementById("globalSlots");

    if (cpEl) cpEl.textContent = formatCP(cp);
    if (storageEl) storageEl.textContent = formatCP(cp) + " / " + formatCP(maxCP);
    if (moneyEl) moneyEl.textContent = money.toLocaleString();
    if (slotEl) slotEl.textContent = buyerSlots;
    if (slotCostEl) slotCostEl.textContent = Math.ceil(buyerSlotCost).toLocaleString();

    if (globalCP) globalCP.textContent = formatCP(cp);
    if (globalStorage) globalStorage.textContent = formatCP(cp) + " / " + formatCP(maxCP);
    if (globalMoney) globalMoney.textContent = money.toLocaleString();
    if (globalSlots) globalSlots.textContent = buyerSlots;
}

// ---------------------------
// Passive CP generation
// ---------------------------
setInterval(function () {
    if (cp < maxCP) {
        cp += production;
        window.cp = cp;;
        if (cp > maxCP) cp = maxCP;
        updateUI();
    }
}, 1000);

// ---------------------------
// DOM loaded: attach click handler
// ---------------------------
window.addEventListener("load", function() {
    const clickBtn = document.getElementById("clickButton");
    if (clickBtn) {
        clickBtn.onclick = function() {
            if (cp < maxCP) {
                cp += 10;
                window.cp = cp; // clicking gives 10 CP
                if (cp > maxCP) cp = maxCP;
                updateUI();
            }
        };
    }

    // Initial UI update
    updateUI();
});

// ---------------------------
// Buy friend slot button function
// ---------------------------
window.buyFriendSlot = function() {
    if (money >= buyerSlotCost) {
        money -= buyerSlotCost;
        window.money = money;
        buyerSlots++;
        buyerSlotCost = Math.ceil(buyerSlotCost * 1.5); // increase cost 1.5x each purchase
        updateUI();
        generateBuyers();
    } else {
        alert("Not enough money!");
    }
};


// ---------------------------
// Initial UI update on load
// ---------------------------
updateUI();
