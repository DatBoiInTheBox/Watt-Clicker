let cp = 0
let cps = 0
let money = 0

let upgrades = {
    drill: {cost:25, power:1},
    generator: {cost:100, power:5},
    contractor: {cost:500, power:20}
}

const cpDisplay = document.getElementById("cp")
const cpsDisplay = document.getElementById("cps")
const moneyDisplay = document.getElementById("money")

document.getElementById("clickButton").onclick = function(){
    cp += 1
    updateUI()
}

function sellCP(){
    money += cp
    cp = 0
    updateUI()
}

function buyUpgrade(name){

    let upgrade = upgrades[name]

    if(money >= upgrade.cost){

        money -= upgrade.cost
        cps += upgrade.power

    }

    updateUI()
}

function updateUI(){

    cpDisplay.textContent = cp
    cpsDisplay.textContent = cps
    moneyDisplay.textContent = money

}

setInterval(function(){

    cp += cps
    updateUI()

},1000)
