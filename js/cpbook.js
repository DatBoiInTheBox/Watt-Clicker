// js/cpbook.js (merged version)

let buyers = [];
let buyerRefreshSeconds = 3600; // 1 hour
let nextBuyerRefresh = buyerRefreshSeconds;
let feed = document.getElementById("buyers") || null;

window.names = [
    "Jason Reed","Chris Parker","Ryan Adams","Daniel Carter","Tyler Brooks",
    "Aaron Hayes","James Walker","Nathan Cooper","Michael Harris","Lucas Turner",
    "Emily Johnson","Sarah Smith","Jessica Lee","Ashley Davis","Amanda Wilson",
    "Brittany Taylor","Samantha Anderson","Lauren Thomas","Megan Moore","Rachel Martin",
    "Olivia Garcia","Sophia Martinez","Isabella Rodriguez"
];

// ---------------------------
// GENERATE BUYER LOGIC
// ---------------------------
function generateBuyer() {
    let requiredCP = Math.max(1, Math.floor(Math.random() * window.maxCP));
    let quality = Math.random() * 0.02;
    let payout = Math.floor(requiredCP * quality);
    let age = Math.floor(Math.random() * 50) + 21;

    return {
        name: randomName(),
        portrait: randomPortrait(),
        requiredCP,
        payout,
        quality: quality.toFixed(2),
        age,
        cpPerDollar: (requiredCP / payout).toFixed(2)
    };
}

function randomName() {
    return window.names[Math.floor(Math.random() * window.names.length)];
}

function randomPortrait() {
    const number = Math.floor(Math.random() * 21) + 1;
    return `portraits/${number}.png`;
}

// ---------------------------
// DISPLAY CPBOOK
// ---------------------------
function displayCPBook() {
    if (!feed) return;
    feed.innerHTML = "";

    buyers.forEach((buyer, index) => {
        const card = document.createElement("div");
        card.className = "buyer-card";

        card.innerHTML = `
            <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%;float:left;margin-right:10px;">
            <div class="buyer-info">
                <h3>${buyer.name}</h3>
                <p>Age: ${buyer.age}</p>
                <p>Quality (Multiplier): ${buyer.quality}</p>
                <p>CP per $: ${buyer.cpPerDollar}</p>
                <p>Needs: ${formatCP(buyer.requiredCP)}</p>
                <p>Payout: $${buyer.payout.toLocaleString()}</p>
            </div>
            <div style="clear:both;"></div>
            <button onclick="sellToBuyer(${index})">Sell</button>
        `;
        feed.appendChild(card);
    });

    const timerEl = document.getElementById("buyerRefreshTimer");
    if (timerEl) timerEl.textContent = Math.ceil(nextBuyerRefresh / 60) + " min";
}

// ---------------------------
// SELL TO BUYER
// ---------------------------
window.sellToBuyer = function(index) {
    const buyer = buyers[index];
    if (!buyer) {
        console.log("Buyer not found");
        return;
    }

    console.log("------ SELL DEBUG ------");
    console.log("Your CP:", window.cp);
    console.log("Buyer needs:", buyer.requiredCP);
    console.log("Your money before:", window.money);

    if (window.cp >= buyer.requiredCP) {

        console.log("Enough CP, selling...");

        window.cp -= buyer.requiredCP;
        window.money += buyer.payout;

        console.log("Your CP after:", window.cp);
        console.log("Your money after:", window.money);

        showNotification(`Sold ${window.formatCP(buyer.requiredCP)} CP for $${buyer.payout.toLocaleString()}`);

        window.updateUI();

    } else {
        console.log("Not enough CP!");
        alert("Not enough CP!");
    }
};

// ---------------------------
// BUYER REFRESH
// ---------------------------
function generateBuyers() {
    buyers = [];
    for (let i = 0; i < window.buyerSlots; i++) {
        buyers.push(generateBuyer());
    }
    displayCPBook();
    nextBuyerRefresh = buyerRefreshSeconds;
}

// Countdown for buyer refresh
setInterval(() => {
    if (nextBuyerRefresh > 0) {
        nextBuyerRefresh--;
        const timerEl = document.getElementById("buyerRefreshTimer");
        if (timerEl) timerEl.textContent = Math.ceil(nextBuyerRefresh / 60) + " min";
    } else {
        generateBuyers();
    }
}, 1000);

// ---------------------------
// OPEN / CLOSE CPBOOK
// ---------------------------
window.openCPBook = function() {
    const app = document.getElementById("cpbookApp");
    if (app) app.classList.remove("hidden");
    displayCPBook();
}

window.closeCPBook = function() {
    const app = document.getElementById("cpbookApp");
    if (app) app.classList.add("hidden");
}

// ---------------------------
// INITIALIZE
// ---------------------------
window.addEventListener("load", function() {
    feed = document.getElementById("buyers");
    generateBuyers();
});
