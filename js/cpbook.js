// js/cpbook.js

let buyers = [];
let feed = document.getElementById("buyers") || null;

let firstNames = [];
let lastNames = [];

// ---------------------------
// DIALOGUE STORAGE (MISSING BEFORE)
// ---------------------------
let spawnDialogues = [];
let halfDialogues = [];
let completeDialogues = [];

// ---------------------------
// LOAD NAME + DIALOGUE FILES
// ---------------------------
async function loadNames() {
    try {
        const firstRes = await fetch("data/first.txt");
        const lastRes = await fetch("data/last.txt");

        const spawnRes = await fetch("data/spawn.txt");
        const halfRes = await fetch("data/half.txt");
        const completeRes = await fetch("data/complete.txt");

        const firstText = await firstRes.text();
        const lastText = await lastRes.text();

        const spawnText = await spawnRes.text();
        const halfText = await halfRes.text();
        const completeText = await completeRes.text();

        firstNames = firstText.split("\n").map(n => n.trim()).filter(n => n);
        lastNames = lastText.split("\n").map(n => n.trim()).filter(n => n);

        spawnDialogues = spawnText.split("\n").map(d => d.trim()).filter(d => d);
        halfDialogues = halfText.split("\n").map(d => d.trim()).filter(d => d);
        completeDialogues = completeText.split("\n").map(d => d.trim()).filter(d => d);

    } catch (err) {
        console.error("Failed loading files:", err);
    }
}

// ---------------------------
// RANDOM HELPERS (RESTORED SAFETY)
// ---------------------------
function randomDialogue(list) {
    if (!list || list.length === 0) return "...";
    return list[Math.floor(Math.random() * list.length)];
}

function randomName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)] || "John";
    const last = lastNames[Math.floor(Math.random() * lastNames.length)] || "Doe";
    return `${first} ${last}`;
}

function randomPortrait() {
    const number = Math.floor(Math.random() * 26) + 1;
    return `portraits/${number}.png`;
}

// ---------------------------
// RARITY SYSTEM (UNCHANGED)
// ---------------------------
const rarities = [
    {name:"Common", chance:0.60, multiplier:1, color:"#777"},
    {name:"Uncommon", chance:0.25, multiplier:1.5, color:"#2ecc71"},
    {name:"Rare", chance:0.10, multiplier:2.5, color:"#3498db"},
    {name:"Epic", chance:0.04, multiplier:5, color:"#9b59b6"},
    {name:"Unique", chance:0.01, multiplier:12, color:"#f1c40f"}
];

const uniqueBuyers = [
    {name:"Elon Musk", portrait:"uniques/elon.png"},
    {name:"MrBeast", portrait:"uniques/mrbeast.png"},
    {name:"The FBI", portrait:"uniques/fbi.png"},
    {name:"The CIA", portrait:"uniques/cia.png"},
    {name:"Jeff Bezos", portrait:"uniques/jeff.png"},
    {name:"Jeffrey Epstein", portrait:"uniques/epstein.png"},
    {name:"Donald Trump", portrait:"uniques/trump.png"},
    {name:"Barack Obama", portrait:"uniques/obama.png"},
    {name:"Vladimir Putin", portrait:"uniques/putin.png"},
    {name:"Kim Jong Un", portrait:"uniques/kim.png"},
    {name:"Charlie Kirk", portrait:"uniques/kirk.png"},
    {name:"The Queen", portrait:"uniques/queen.png"},
    {name:"Pope Francis", portrait:"uniques/pope.png"},
    {name:"Bill Gates", portrait:"uniques/gates.png"},
    {name:"Mark Zuckerberg", portrait:"uniques/mark.png"},
    {name:"Jim Watt", portrait:"uniques/watt.png"},
    {name:"Osama Bin Laden", portrait:"uniques/osama.png"},
    {name:"Dan Schneider", portrait:"uniques/schneider.png"},
    {name:"The Rock", portrait:"uniques/rock.png"},
    {name:"Taylor Swift", portrait:"uniques/taylor.png"},
    {name:"Kanye West", portrait:"uniques/kanye.png"},
    {name:"Sean Diddy Combs", portrait:"uniques/diddy.png"},
    {name:"Gordon Ramsay", portrait:"uniques/ramsay.png"},
    {name:"Snoop Dogg", portrait:"uniques/snoop.png"},
    {name:"Drake", portrait:"uniques/drake.png"},
    {name:"Eminem", portrait:"uniques/eminem.png"},
    {name:"Beyoncé", portrait:"uniques/beyonce.png"},
    {name:"Bobby Kotick", portrait:"uniques/kotick.png"},
];


function rollRarity(){
    let roll = Math.random();
    let total = 0;

    for (let r of rarities){
        total += r.chance;
        if (roll <= total) return r;
    }

    return rarities[0];
}

// ---------------------------
// GENERATE BUYER (UNCHANGED)
// ---------------------------
function generateBuyer() {

    let rarity = rollRarity();

    let min = window.maxCP * 0.10;
    let max = window.maxCP * 1.80;

    let requiredCP = Math.floor(Math.random() * (max - min) + min);
    let quality = Math.random() * 0.02 + 0.01;
    let payout = Math.floor(requiredCP * quality * rarity.multiplier);

    let age = Math.floor(Math.random() * 50) + 21;

    let name = randomName();
    let portrait = randomPortrait();

    if (rarity.name === "Unique"){
        let u = uniqueBuyers[Math.floor(Math.random()*uniqueBuyers.length)];
        name = u.name;
        portrait = u.portrait;
        age = "???";
    }

    return {
        name,
        portrait,
        requiredCP,
        deliveredCP:0,
        payout,
        age,
        rarity:rarity.name,
        rarityColor:rarity.color,
        stage: "spawn",
        dialogue: randomDialogue(spawnDialogues) // 👈 NEW
    };
}

// ---------------------------
// GIVE CP (FIXED + SAFE)
// ---------------------------
window.giveCP = function(index) {

    const buyer = buyers[index];
    if (!buyer) return;

    let dialogue = "";

    // dialogue BEFORE spending CP
    if (buyer.stage === "spawn") {
        buyer.dialogue = randomDialogue(spawnDialogues);
        updateBuyerDialogue(index);
        buyer.stage = "half";
    } else if (buyer.stage === "half") {
        buyer.dialogue = randomDialogue(halfDialogues);
        updateBuyerDialogue(index);
    }

    if (window.cp <= 0) {
        alert("You have no CP!");
        return;
    }

    let remaining = buyer.requiredCP - buyer.deliveredCP;
    let amount = Math.min(window.cp, remaining);

    window.cp -= amount;
    buyer.deliveredCP += amount;

    window.updateUI();

    // ---------------------------
    // COMPLETION
    // ---------------------------
    if (buyer.deliveredCP >= buyer.requiredCP) {

        buyer.dialogue = randomDialogue(completeDialogues);
        updateBuyerDialogue(index);

        window.money += buyer.payout;

        // update UI immediately so final dialogue shows
        displayCPBook();

        setTimeout(() => {
            buyers[index] = generateBuyer();
            displayCPBook();
        }, 3000);

        return;
    }

    // ---------------------------
    // HALF PROGRESS TRIGGER
    // ---------------------------
    if (buyer.deliveredCP >= buyer.requiredCP / 2 && buyer.stage === "half") {
        showNotification(`${buyer.name}: "${dialogue}"`);
    }

    showNotification(`Sent ${formatCP(amount)} CP`);
};

// ---------------------------
// DISPLAY (UPDATED WITH DIALOGUE)
// ---------------------------
function displayCPBook() {

    if (!feed) return;

    feed.innerHTML = "";

    buyers.forEach((buyer, index) => {

        const progress = buyer.deliveredCP / buyer.requiredCP;

        const card = document.createElement("div");
        card.className = "buyer-card";

        card.innerHTML = `
            <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%;float:left;margin-right:10px;">

            <div class="buyer-info">
                <h3>
                ${buyer.name}
                <span style="color:${buyer.rarityColor};font-size:12px;">
                [${buyer.rarity}]
                </span>
                </h3>

                <p>${buyer.age}</p>

                <div id="dialogue-${index}" style="
                    margin:6px 0;
                    padding:6px 8px;
                    background:#f4f4f4;
                    border-radius:6px;
                    font-style:italic;
                    font-size:13px;
                ">
                    ${buyer.dialogue || ""}
                </div>

                <p>Request: ${formatCP(buyer.requiredCP)}</p>
                <p>Delivered: ${formatCP(buyer.deliveredCP)}</p>

                <div style="background:#ddd;height:8px;border-radius:5px;">
                    <div style="width:${progress*100}%;background:#1877f2;height:8px;border-radius:5px;"></div>
                </div>
            </div>

            <button onclick="giveCP(${index})">Send CP</button>
        `;

        feed.appendChild(card);
    });
}

// ---------------------------
// OPEN / CLOSE (UNCHANGED)
// ---------------------------
window.openCPBook = function() {
    const app = document.getElementById("cpbookApp");
    if (app) app.classList.remove("hidden");
    displayCPBook();
}; 

window.closeCPBook = function() {
    const app = document.getElementById("cpbookApp");
    if (app) app.classList.add("hidden");
};

// ---------------------------
// GENERATE BUYERS (RESTORED - YOU WERE MISSING THIS)
// ---------------------------
function generateBuyers() {

    buyers = [];

    for (let i = 0; i < window.buyerSlots; i++) {
        buyers.push(generateBuyer());
    }

    displayCPBook();
}

function updateBuyerDialogue(index) {
    const el = document.getElementById(`dialogue-${index}`);
    if (el) el.textContent = buyers[index].dialogue || "";
}

// ---------------------------
// INIT (FIXED)
// ---------------------------
window.addEventListener("load", async function () {

    feed = document.getElementById("buyers");

    await loadNames();
    generateBuyers();

});