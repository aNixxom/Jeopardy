import {_dom} from '/Scripts/game_variables.js'
import { systemMessage } from '/Scripts/createNewPlayers.js' 

let isOpen = false
let mainBody = document.querySelector('body')
let player_headers = document.getElementsByClassName('headers'), i;
let boxes = document.querySelectorAll('.boxes')

let frfc = document.getElementById("frfc")
let secondrsecondc = document.getElementById("2r2c")
let threerthreec = document.getElementById("3r3c")
let four4fourc = document.getElementById("4r4c")
let fiverfivec = document.getElementById("5r5c")

function openMenu() {
    if(isOpen == false && _dom.viewingQuestion == false) {
        _dom.main.style.display = "none"
        _dom.settings_menu.setAttribute('class', 'settings-menu animate__animated animate__zoomIn')
        _dom.settings_menu.style.display = "block"
        isOpen = true
    } else if(isOpen == true) {
        closeMenu()
    }
}

function closeMenu() {
    _dom.main.style.display = "block"
    _dom.settings_menu.style.display = "none"
    isOpen = false
}

function changeAudio() {
    if(_dom.is_muted == false) {
        _dom.mute_button.style.display = "none"
        _dom.unmute_button.style.display = "block"

        _dom.countdown_music.muted = true
        _dom.countdown_music.pause()
        _dom.countdown_music.currentTime = 0

        _dom.times_up.muted = true
        _dom.times_up.pause()
        _dom.times_up.currentTime = 0

        _dom.is_muted = true
        systemMessage("Muted Game Audio")
    } else {
        _dom.mute_button.style.display = "block"
        _dom.unmute_button.style.display = "none"

        _dom.countdown_music.muted = false
        _dom.times_up.muted = false
        _dom.is_muted = false
        systemMessage("Unmuted Game Audio")
    }
}

_dom.mute_button.onclick = function () { changeAudio() }
_dom.unmute_button.onclick = function () { changeAudio() }
_dom.menu_button.onclick = function () { openMenu() }

_dom.doubleTimeSwitch.onclick = function toggle(event) {
    let clicked = event.target.classList[0]
    if(_dom.doubleTimeCheatEnabled == false && clicked == "settings-toggle-button-one") {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-on-outline")
        _dom.doubleTimeCheatEnabled = true
        _dom.double_time_icon.style.display = "block"
        systemMessage("Enabled Double Time")
        _dom.questionLength = 12000
    } else if(_dom.doubleTimeCheatEnabled == true && clicked == "settings-toggle-button-one" ) {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.doubleTimeCheatEnabled = false
        _dom.questionLength = 6000
        _dom.double_time_icon.style.display = "none"
        systemMessage("Disabled Double Time")
    }
}

_dom.double_time_icon.onclick = function toggleIcon(e) {
    if(_dom.viewingQuestion == true) {
        systemMessage("You can't disable this setting while viewing a question")
    } else {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.doubleTimeCheatEnabled = false
        _dom.questionLength = 6000
        _dom.double_time_icon.style.display = "none"
        systemMessage("Disabled Double Time")
    }
}

_dom.editModeSwitch.onclick = function toggle(event) {
    let clicked = event.target.classList[0]
    if(_dom.editModeToggled == false && clicked == "settings-toggle-button-two") {
        _dom.editModeSwitch.setAttribute("name", "radio-button-on-outline")
        for (i = 0; i < player_headers.length; i++) {
            player_headers[i].className = "headers headers-edit"
        }
        _dom.editModeToggled = true
        _dom.edit_mode_icon.style.display = "block"
        systemMessage("Enabled Edit Mode")
    } else if(_dom.editModeToggled == true ) {
        _dom.editModeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.editModeToggled = false
        _dom.edit_mode_icon.style.display = "none"
        for (i = 0; i < player_headers.length; i++) {
            player_headers[i].className = "headers"
        }
        systemMessage("Disabled Edit Mode")
    }
}

_dom.edit_mode_icon.onclick = function toggleIcon(e) {
    if(_dom.viewingQuestion == true) {
        systemMessage("You can't disable this setting while viewing a question")
    } else {
        _dom.editModeSwitch.setAttribute("name", "radio-button-off-outline")
        _dom.editModeToggled = false
        _dom.edit_mode_icon.style.display = "none"
        for (i = 0; i < player_headers.length; i++) {
            player_headers[i].className = "headers"
        }
        systemMessage("Disabled Edit Mode")
    }
}

_dom.doublePointsSwitch.onclick = function toggle(event) {
    let clicked = event.target.classList[0]
    if(_dom.doublePointToggled == false && clicked == "settings-toggle-button-three") {
        _dom.doublePointsSwitch.setAttribute("name", "radio-button-on-outline")
        systemMessage("Enabled Double Points")
        for(i = 0; i < frfc.children.length; i++) {
           checkQuestion(frfc, '$400')
        }
        for(i = 0; i < secondrsecondc.children.length; i++) {
            checkQuestion(secondrsecondc, '$800')
        }
        for(i = 0; i < threerthreec.children.length; i++) {
            checkQuestion(threerthreec, '$1200')
        }
        for(i= 0; i < four4fourc.children.length; i++) {
            checkQuestion(four4fourc, '$1600')
        }
        for(i = 0; i < fiverfivec.children.length; i++) {
            checkQuestion(fiverfivec, '$2000')
        }
        _dom.default_point_value = 400
        _dom.doublePointToggled = true
        _dom.double_points_icon.style.display = "block"
    } else if(_dom.doublePointToggled == true) {
        _dom.doublePointsSwitch.setAttribute("name", "radio-button-off-outline")
        systemMessage("Disabled Double Points")
        for(i = 0; i < frfc.children.length; i++) {
            checkQuestion(frfc, '$200')
        }
        for(i = 0; i < secondrsecondc.children.length; i++) {
            checkQuestion(secondrsecondc, '$400')
        }
        for(i = 0; i < threerthreec.children.length; i++) {
            checkQuestion(threerthreec, '$600')
        }
        for(i= 0; i < four4fourc.children.length; i++) {
            checkQuestion(four4fourc, '$800')
        }
        for(i = 0; i < fiverfivec.children.length; i++) {
            checkQuestion(fiverfivec, '$1000')
        }
        _dom.default_point_value = 200
        _dom.doublePointToggled = false
        _dom.double_points_icon.style.display = "none"
    }
}

_dom.double_points_icon.onclick = function toggleIcon() {
    if(_dom.viewingQuestion == true) {
        systemMessage("You can't disable this setting while viewing a question")
    } else {
        _dom.doublePointsSwitch.setAttribute("name", "radio-button-off-outline")
        for(i = 0; i < frfc.children.length; i++) {
            checkQuestion(frfc, '$200')
        }
        for(i = 0; i < secondrsecondc.children.length; i++) {
            checkQuestion(secondrsecondc, '$400')
        }
        for(i = 0; i < threerthreec.children.length; i++) {
            checkQuestion(threerthreec, '$600')
        }
        for(i= 0; i < four4fourc.children.length; i++) {
            checkQuestion(four4fourc, '$800')
        }
        for(i = 0; i < fiverfivec.children.length; i++) {
            checkQuestion(fiverfivec, '$1000')
        }
        _dom.default_point_value = 200
        _dom.doublePointToggled = false
        _dom.double_points_icon.style.display = "none"
        systemMessage("Disabled Double Points")
    }
}

function checkQuestion(question, points) {
    if(question.children[1].innerHTML != '-') {
        question.children[1].innerHTML = points
    }
}

export {closeMenu, changeAudio}
