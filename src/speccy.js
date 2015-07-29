function add_borders() {
    var borderleft = document.createElement("div")
    var borderright = document.createElement("div")
    var bordertop = document.createElement("div")
    var borderbottom = document.createElement("div")

    document.body.appendChild(borderleft)
    document.body.appendChild(borderright)
    document.body.appendChild(bordertop)
    document.body.appendChild(borderbottom)

    return {
        borderleft: borderleft,
        borderright: borderright,
        bordertop: bordertop,
        borderbottom: borderbottom
    }
}

function run_with_options(options) {
    var borders = add_borders()
    var showTimeoutId

    if (options.startAlways) {
        show_borders(options, borders)
    } else {
        showTimeoutId = setTimeout(show_borders, options.startTimeoutValue * 1000, options, borders)
    }

    window.addEventListener("load", function() {
        if (options.endImmediately) {
            hide_borders(borders, showTimeoutId)
        } else {
            setTimeout(hide_borders, options.endTimeoutValue * 1000, borders, showTimeoutId)
        }
    })
}

function show_borders(options, borders) {
    var pattern
    switch (options.colours) {
        case 'header':
            pattern = 'speccy-header'
            break

        case 'bytes':
            pattern = 'speccy-bytes'
            break

        case 'random':
            if (Math.floor((Math.random() * 10)) % 2 == 0) {
                pattern = "speccy-header"
            } else {
                pattern = "speccy-bytes"
            }
    }

    borders.borderleft.setAttribute("class", pattern + " speccy-left")
    borders.borderright.setAttribute("class", pattern + " speccy-right")
    borders.bordertop.setAttribute("class", pattern + " speccy-top")
    borders.borderbottom.setAttribute("class", pattern + " speccy-bottom")
}

function hide_borders(borders, showTimeoutId) {
    if (showTimeoutId) {
        clearTimeout(showTimeoutId)
    }

    borders.borderleft.remove()
    borders.borderright.remove()
    borders.bordertop.remove()
    borders.borderbottom.remove()
}