import {_dom} from '/Scripts/vars.js'

var isOpen = false
var isToggled = false

function toggle() {
    if(isToggled == false) {
        _dom.toggle_switch.setAttribute("name", "radio-button-on-outline")
        isToggled = true
    } else if(isToggled == true ) {
        _dom.toggle_switch.setAttribute("name", "radio-button-off-outline")
        isToggled = false
    }
}

function openMenu() {
    if(isOpen == false) {
        console.info(event.target.id)
        _dom.main.style.visibility = "hidden"
        _dom.settings_menu.style.display = "block"
        _dom.settings_menu.style.display = "initial"
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

_dom.menu_button.onclick = function () {openMenu()}
_dom.toggle_switch.onclick = function () {toggle()}

