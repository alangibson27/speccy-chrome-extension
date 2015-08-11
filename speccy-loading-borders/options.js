function get_options() {
    return {
        colours: document.getElementById('colours').value,
        startAlways: document.getElementById('startAlways').checked,
        startTimeoutValue: document.getElementById('startTimeoutValue').value,
        endImmediately: document.getElementById('endImmediately').checked,
        endTimeoutValue: document.getElementById('endTimeoutValue').value
    }
}

function save_options() {

    chrome.storage.sync.set(get_options(), function() {
        var status = document.getElementById('status')
        status.textContent = 'Saved!'
        setTimeout(function() {
            status.textContent = ''
        }, 750)
    })
}

function restore_options() {
    chrome.storage.sync.get({
        colours: 'header',
        startAlways: false,
        startTimeoutValue: 1,
        endImmediately: false,
        endTimeoutValue: 2
    }, function(items) {
        document.getElementById('colours').value = items.colours
        document.getElementById('startAlways').checked = items.startAlways
        document.getElementById('startTimeout').checked = !items.startAlways
        document.getElementById('startTimeoutValue').value = items.startTimeoutValue

        document.getElementById('endImmediately').checked = items.endImmediately
        document.getElementById('endTimeout').checked = !items.endImmediately
        document.getElementById('endTimeoutValue').value = items.endTimeoutValue
    })
}

function test_options() {
    var borders = add_borders()
    var options = get_options()
    setTimeout(show_borders, 0, options, borders)
    setTimeout(hide_borders, options.endTimeoutValue * 1000 || 2000, borders)
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
document.getElementById('test').addEventListener('click', test_options)