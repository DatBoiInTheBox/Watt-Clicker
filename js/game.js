let cp = 0
let money = 0

let maxCP = 1000 // MB

let production = 1

let buyerSlots = 1

function updateUI(){

document.getElementById("cp").textContent = formatCP(cp)
document.getElementById("money").textContent = money

document.getElementById("storage").textContent =
formatCP(cp) + " / " + formatCP(maxCP)

}

document.getElementById("clickButton").onclick = function(){

if(cp < maxCP){

cp += 10

updateUI()

}

}

setInterval(function(){

if(cp < maxCP){

cp += production

updateUI()

}

},1000)