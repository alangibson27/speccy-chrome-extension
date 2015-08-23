var loaded = false

window.addEventListener('load', function() {
    loaded = true
}, false)

function add_borders() {
    // Add divs to the top, bottom, left and right of the body, which can then
    // have a loading border style applied to them.
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
    // If the document body tag has been loaded already, inject our borders.
    // Otherwise, wait half a second and try again.
    if (document.body) {
        run_now(options)
    } else {
        setTimeout(run_with_options, 500, options)
    }
}

function run_now(options) {
    var borders = add_borders()
    var showTimeoutId

    // Set the borders to be hidden at some point after the page has finished
    // loading.
    window.addEventListener('load', function() {
        if (options.endImmediately) {
            hide_borders(borders, showTimeoutId)
        } else {
            setTimeout(hide_borders, options.endTimeoutValue * 1000, borders, showTimeoutId)
        }
    }, false)

    // Show the borders either immediately or after a timeout.
    if (options.startAlways) {
        show_borders(options, borders)
    } else {
        showTimeoutId = setTimeout(show_borders, options.startTimeoutValue * 1000, options, borders)
    }
}

function show_borders(options, borders) {
    if (!loaded) {
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
}

function hide_borders(borders, showTimeoutId) {
    // Make sure any timeout for showing the borders is cleared.
    if (showTimeoutId) {
        clearTimeout(showTimeoutId)
    }

    borders.borderleft.remove()
    borders.borderright.remove()
    borders.bordertop.remove()
    borders.borderbottom.remove()
}