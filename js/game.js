// js/game.js

window.cp = 0;
window.money = 0;
window.maxCP = 1000;
window.production = 1;
window.buyerSlots = 1;
window.buyerSlotCost = 20;

// expose globals
window.cp = cp;
window.money = money;
window.maxCP = maxCP;
window.buyerSlots = buyerSlots;
window.buyerSlotCost = buyerSlotCost;
window.updateUI = updateUI;
window.formatCP = formatCP;

// ---------------------------
// FORMAT CP nicely
// ---------------------------
function formatCP(value) {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + " EX";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + " PB";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + " TB";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + " GB";
    return value + " MB";
}

// ---------------------------
// UPDATE UI
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
// NOTIFICATION
// ---------------------------
function showNotification(text) {
    const note = document.createElement("div");
    note.textContent = text;

    note.style.position = "fixed";
    note.style.bottom = "20px";
    note.style.left = "50%";
    note.style.transform = "translateX(-50%)";
    note.style.background = "#1877f2";
    note.style.color = "white";
    note.style.padding = "10px 16px";
    note.style.borderRadius = "6px";
    note.style.fontWeight = "600";
    note.style.zIndex = "9999";

    document.body.appendChild(note);

    setTimeout(() => note.remove(), 2500);
}

// ---------------------------
// SAVE SYSTEM
// ---------------------------
function getSaveData() {
    return {
        cp: cp,
        money: money,
        maxCP: maxCP,
        production: production,
        buyerSlots: buyerSlots,
        buyerSlotCost: buyerSlotCost,
        upgrades: window.getUpgradeSave ? window.getUpgradeSave() : null,
        walmart: window.getWalmartSave ? window.getWalmartSave() : null,
        blackMarket: window.getBlackMarketSave ? window.getBlackMarketSave() : null
    };
}

window.downloadSave = function () {
    const data = JSON.stringify(getSaveData());
    const blob = new Blob([data], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "watt-clicker.sav";
    a.click();

    showNotification("Save downloaded!");
};

window.loadSaveFile = function (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // --- CORE DATA ---
            cp = data.cp || 0;
            money = data.money || 0;
            maxCP = data.maxCP || 1000;
            production = data.production || 1;
            buyerSlots = data.buyerSlots || 1;
            buyerSlotCost = data.buyerSlotCost || 20;

            // --- LOAD UPGRADES ---
            if (data.upgrades && window.loadUpgradeSave) {
                window.loadUpgradeSave(data.upgrades);
            }
            if (data.walmart && window.loadWalmartSave) {
                window.loadWalmartSave(data.walmart);
            }

            // --- SYNC GLOBALS ---
            window.cp = cp;
            window.money = money;
            window.maxCP = maxCP;
            window.buyerSlots = buyerSlots;
            window.buyerSlotCost = buyerSlotCost;

            // --- REFRESH UI ---
            updateUI();

            // refresh depot UI if it's open
            if (window.displayDepot) {
                displayDepot();
            }

            showNotification("Save loaded!");
        } catch (err) {
            console.error(err);
            alert("Invalid save file!");
        }
    };

    reader.readAsText(file);
};

// ---------------------------
// PASSIVE CP
// ---------------------------
setInterval(function () {
    if (cp < maxCP) {
        cp += production;
        window.cp = cp;
        if (cp > maxCP) cp = maxCP;
        updateUI();
    }
}, 1000);

// ---------------------------
// LOAD EVENT
// ---------------------------
window.addEventListener("load", function () {
    const clickBtn = document.getElementById("clickButton");
    if (clickBtn) {
        clickBtn.onclick = function () {
            if (cp < maxCP) {
                cp += 10;
                window.cp = cp;
                if (cp > maxCP) cp = maxCP;
                updateUI();
            }
        };
    }
    const loadInput = document.getElementById("loadSave");
    if (loadInput) {
        loadInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                loadSaveFile(file);
            }
        });
    }
    updateUI();
    
});

// ---------------------------
// BUY SLOT
// ---------------------------
window.buyFriendSlot = function () {
    if (money >= buyerSlotCost) {
        money -= buyerSlotCost;
        window.money = money;

        buyerSlots++;
        buyerSlotCost = Math.ceil(buyerSlotCost * 1.5);

        updateUI();
        generateBuyers();
    } else {
        alert("Not enough money!");
    }
};

// ---------------------------
// INITIAL UPDATE
// ---------------------------
updateUI();