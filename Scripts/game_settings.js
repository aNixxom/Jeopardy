import {_dom} from '/Scripts/game_variables.js'



var isOpen = false
var n_bar = document.getElementById('n-bar')

function openMenu() {
    if(isOpen == false && _dom.viewingQuestion == false) {
        //console.info(event.target.id) (used for debug)
        _dom.main.style.visibility = "hidden"
        _dom.settings_menu.setAttribute('class', 'settings-menu animate__animated animate__zoomIn')
        _dom.settings_menu.style.display = "block"
        isOpen = true
    } else if(isOpen == true) {
        closeMenu()
    }
}

function closeMenu() {
    _dom.main.style.visibility = "visible"
    _dom.settings_menu.style.display = "none"
    isOpen = false
}

_dom.menu_button.onclick = function () { openMenu() }


_dom.doubleTimeSwitch.onclick = function toggle(event) {
    var clicked = event.target.classList[0]
    if(_dom.doubleTimeCheatEnabled == false && clicked == "settings-toggle-button-one") {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-on-outline")
        _dom.doubleTimeCheatEnabled = true
        console.log("doubleTimeCheatEnabled: " + _dom.doubleTimeCheatEnabled)
        _dom.questionLength = 12000
    } else if(_dom.doubleTimeCheatEnabled == true && clicked == "settings-toggle-button-one" ) {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.doubleTimeCheatEnabled = false
        _dom.questionLength = 6000
        console.log("doubleTimeCheatEnabled: " + _dom.doubleTimeCheatEnabled)
    }
}

_dom.editModeSwitch.onclick = function toggle(event) {
    var clicked = event.target.classList[0]
    if(_dom.editModeToggled == false && clicked == "settings-toggle-button-two") {
        _dom.editModeSwitch.setAttribute("name", "radio-button-on-outline")
        _dom.editModeToggled = true
        n_bar.style.display = "initial"
        n_bar.style.display = "block"
    } else if(_dom.editModeToggled == true ) {
        _dom.editModeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.editModeToggled = false
        n_bar.style.display = "none"
       
    }
}

export {closeMenu}
