// js/cpbook.js (PROGRESSIVE REQUEST SYSTEM)

let buyers = [];
let feed = document.getElementById("buyers") || null;

window.names = [
    "Jason Reed","Chris Parker","Ryan Adams","Daniel Carter","Tyler Brooks",
    "Aaron Hayes","James Walker","Nathan Cooper","Michael Harris","Lucas Turner",
    "Emily Johnson","Sarah Smith","Jessica Lee","Ashley Davis","Amanda Wilson",
    "Brittany Taylor","Samantha Anderson","Lauren Thomas","Megan Moore","Rachel Martin",
    "Olivia Garcia","Sophia Martinez","Isabella Rodriguez", "Emma Hernandez","Ava Lopez",
    "Mia Gonzalez","Abigail Perez","Madison Wilson", "Elizabeth Sanchez","Emily Ramirez",
    "Sofia Torres","Avery Flores","Chloe Rivera", "Ella Gomez","Grace Diaz","Victoria Murphy",
    "Lily Nguyen","Natalie Kim", "Zoe Patel","Hannah Lee","Addison Clark","Brooklyn Lewis","Lillian Young",
    "Samantha King","Aubrey Wright","Evelyn Scott","Harper Green","Camila Adams","Aria Baker",
    "Scarlett Nelson","Penelope Carter","Layla Mitchell","Riley Perez","Nora Roberts","Lillian Turner",
    "Zoey Phillips","Mila Campbell","Aubree Parker","Ellie Evans","Stella Edwards","Paisley Collins",
    "Audrey Stewart","Skylar Sanchez","Violet Morris","Claire Rogers","Bella Reed", "Lucy Cook","Anna Morgan",
    "Sophie Bell","Sadie Murphy","Caroline Bailey","Kennedy Rivera","Genesis Cooper","Aaliyah Richardson",
    "Allison Cox","Gabriella Howard","Alice Ward", "Madelyn Torres","Cora Peterson","Ruby Gray","Eva Ramirez",
    "Serenity James", "Autumn Watson","Piper Brooks","Hailey Kelly","Gianna Sanders","Valentina Price",
    "Elena Bennett","Naomi Wood","Caroline Barnes","Kinsley Ross","Alice Henderson","Sadie Coleman",
    "Hailey Jenkins","Madeline Perry","Peyton Powell","Julia Long","Mackenzie Patterson","Katherine Hughes",
    "Vivian Flores","Reagan Simmons","Sophie Foster","Madelyn Howard","Adeline Russell","Brielle Griffin",
    "Clara Diaz","Kylie Hayes","Molly Myers","Parker Ford","Lydia Hamilton","Ariana Graham",
    "Madison Sullivan","Isabelle Wallace","Julia West","Willow Cole","Everly Bryant","Bella Alexander",
    "Claire Russell","Skylar Griffin","Lucy Reed","Paisley Howard","Anna Ward","Caroline Brooks",
    "Kennedy Price","Genesis Bennett","Allison Wood","Gabriella Barnes","Alice Ross","Madelyn Henderson",
    "Cora Coleman","Ruby Jenkins","Eva Perry","Serenity Powell","Autumn Long","Piper Patterson",
    "Hailey Hughes","Gianna Simmons","Valentina Foster","Elena Howard","Naomi Howard",
    "Caroline Russell","Kinsley Griffin","Alice Reed","Sadie Howard","Hailey Howard","Madeline Howard",
    "Peyton Howard","Julia Howard","Mackenzie Howard","Katherine Howard","Vivian Howard",
    "Reagan Howard","Sophie Howard","Madelyn Howard","Adeline Howard","Brielle Howard",
    "Clara Howard","Kylie Howard","Molly Howard","Parker Howard","Lydia Howard","Ariana Justice",
    "Kenny Heath", "Gary Price", "Timothy Lee", "Ryan Wilson", "Brandon Davis", "Jacob Miller", "Justin Taylor",
    "Kevin Anderson", "Brian Thomas", "Eric Jackson", "Steven White", "Scott Harris", "Adam Martin",
    "Benjamin Thompson", "Gregory Garcia", "Alexander Martinez", "Patrick Robinson", "Sean Clark",
    "Dennis Rodriguez", "Zachary Lewis", "Tyler Lee", "Jose Walker", "Nathan Hall", "Aaron Allen",
    "Justin Young", "Brandon Hernandez", "Kevin King", "Jason Wright", "Ryan Lopez", "Jacob Hill",
    "Gary Scott", "Timothy Green", "Brandon Adams", "Jacob Baker", "Justin Gonzalez", "Kevin Nelson",
    "Brian Carter", "Eric Mitchell", "Steven Perez", "Scott Roberts", "Adam Turner", "Benjamin Phillips",
    "Gregory Campbell", "Alexander Parker", "Patrick Evans", "Sean Edwards", "Dennis Collins",
    "Zachary Stewart", "Tyler Sanchez", "Jose Morris", "Nathan Rogers", "Aaron Reed", "Justin Cook",
];

// ---------------------------
// RARITY SYSTEM
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
// GENERATE REQUEST
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
        rarityColor:rarity.color
    };
}

function randomName() {
    return window.names[Math.floor(Math.random() * window.names.length)];
}

function randomPortrait() {
    const number = Math.floor(Math.random() * 26) + 1;
    return `portraits/${number}.png`;
}

// ---------------------------
// DISPLAY CPBOOK
// ---------------------------
function displayCPBook() {

    if (!feed) return;

    feed.innerHTML = "";

    buyers.forEach((buyer, index) => {

        const progress = buyer.deliveredCP / buyer.requiredCP;

        const card = document.createElement("div");
        card.className = "buyer-card";
        card.id = "buyer-" + index;

        card.innerHTML = `
            <img src="${buyer.portrait}" style="width:60px;height:60px;border-radius:50%;float:left;margin-right:10px;">

            <div class="buyer-info">
                <h3>
                ${buyer.name}
                <span style="color:${buyer.rarityColor};font-size:12px;">
                [${buyer.rarity}]
                </span>
                </h3>
                <p>Age: ${buyer.age}</p>

                <p>Request: ${formatCP(buyer.requiredCP)}</p>
                <p>Delivered: <span id="delivered-${index}">${formatCP(buyer.deliveredCP)}</span></p>
                <p>Total Payout: $${buyer.payout.toLocaleString()}</p>

                <div style="background:#ddd;height:8px;border-radius:5px;margin-top:6px;">
                    <div id="progress-${index}" style="width:${progress*100}%;background:#1877f2;height:8px;border-radius:5px;"></div>
                </div>
            </div>

            <div style="clear:both;"></div>

            <button onclick="giveCP(${index})">Send CP</button>
        `;

        feed.appendChild(card);
    });
}

// ---------------------------
// GIVE CP TO BUYER
// ---------------------------
window.giveCP = function(index) {

    const buyer = buyers[index];
    if (!buyer) return;

    if (window.cp <= 0) {
        alert("You have no CP!");
        return;
    }

    let remaining = buyer.requiredCP - buyer.deliveredCP;

    let amount = Math.min(window.cp, remaining);

    // remove CP but DO NOT give money yet
    window.cp -= amount;

    buyer.deliveredCP += amount;

    window.updateUI();

    // ---------------------------
    // COMPLETED REQUEST
    // ---------------------------
    if (buyer.deliveredCP >= buyer.requiredCP) {

        // FULL payout happens here
        window.money += buyer.payout;

        showNotification(
            `${buyer.name}'s request completed! +$${buyer.payout.toLocaleString()}`
        );

        buyers[index] = generateBuyer(); // replace buyer
        displayCPBook();
        return;
    }

    // ---------------------------
    // UPDATE UI LIVE
    // ---------------------------

    let deliveredEl = document.getElementById("delivered-" + index);
    let progressEl = document.getElementById("progress-" + index);

    if (deliveredEl)
        deliveredEl.textContent = formatCP(buyer.deliveredCP);

    if (progressEl)
        progressEl.style.width = (buyer.deliveredCP / buyer.requiredCP * 100) + "%";

    showNotification(`Sent ${formatCP(amount)} CP`);
};

// ---------------------------
// GENERATE REQUEST LIST
// ---------------------------
function generateBuyers() {

    buyers = [];

    for (let i = 0; i < window.buyerSlots; i++) {
        buyers.push(generateBuyer());
    }

    displayCPBook();
}

// ---------------------------
// OPEN / CLOSE CPBOOK
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
// INITIALIZE
// ---------------------------
window.addEventListener("load", function () {

    feed = document.getElementById("buyers");
    generateBuyers();

});