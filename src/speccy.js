var borderleft = document.createElement("div")
var borderright = document.createElement("div")
var bordertop = document.createElement("div")
var borderbottom = document.createElement("div")

document.body.appendChild(borderleft)
document.body.appendChild(borderright)
document.body.appendChild(bordertop)
document.body.appendChild(borderbottom)

function showBorder() {
    var pattern
    if (Math.floor((Math.random() * 10)) % 2 == 0) {
        pattern = "speccy-header"
    } else {
        pattern = "speccy-bytes"
    }

    borderleft.setAttribute("class", pattern + " speccy-left")
    borderright.setAttribute("class", pattern + " speccy-right")
    bordertop.setAttribute("class", pattern + " speccy-top")
    borderbottom.setAttribute("class", pattern + " speccy-bottom")
}

function hideBorder() {
    borderleft.remove()
    borderright.remove()
    bordertop.remove()
    borderbottom.remove()
}


var showTimeoutId = setTimeout(showBorder, 1000)

window.addEventListener("load", function() {
    clearTimeout(showTimeoutId);
    setTimeout(hideBorder, 2000);
});
