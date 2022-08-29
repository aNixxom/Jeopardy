let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let popup = document.getElementById('popup')
let player_names_table = document.getElementById('player_names')
let player_score_text = document.getElementById('player_score_text')
let main_table = document.getElementById('main-table')
let every_class = document.querySelectorAll('*[class]')
let player_headers = document.getElementsByClassName('headers'), i;
let secondrsecondc = document.getElementById("2r2c")
let threerthreec = document.getElementById("3r3c")
let four4fourc = document.getElementById("4r4c")
let fiverfivec = document.getElementById("5r5c")

import { closeMenu, changeAudio } from '/Scripts/game_settings.js'
import { systemMessage, screenShake, addSavedPlayer} from '/Scripts/createNewPlayers.js'
import {_dom} from '/Scripts/game_variables.js'
import {_pVars} from '/Scripts/game_variables.js'

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)
deleteButton.addEventListener('click', deleteLocalStorage)

if(localStorage.length != 0) {
    let loadRecentSave = confirm("Load recent save?")
    if(loadRecentSave == true) {
        loadSave()
    }
}

function saveGame() {
    localStorage.clear()
    for(let i = 0; i < player_names_table.children.length; i++) {
        localStorage.setItem(player_names_table.children[i].id, player_names_table.children[i].innerHTML)
    }

    for(let i = 0; i < player_score_text.children.length; i++) {
        localStorage.setItem(player_score_text.children[i].id, player_score_text.children[i].innerHTML)
    }

    for(let i = 0; i < every_class.length; i++) {
        if(every_class[i].classList.contains('used')) {
            let question_id = every_class[i].id
            let question_class = every_class[i].className.slice(-4)
            localStorage.setItem(question_id, question_class)
        }
    }
 
    if(_dom.doubleTimeCheatEnabled == true) {
        localStorage.setItem('doubleTimeCheatEnabled', true)
    }

    if(_dom.editModeToggled == true ) {
        localStorage.setItem('editModeToggled', true)
    }

    if(_dom.doublePointToggled == true) {
        localStorage.setItem('doublePointToggled', true)
    }

    if(_dom.is_muted == true) {
        localStorage.setItem('audioMuted', true)
    }

    console.log(localStorage)
    systemMessage("Game saved")
}

function loadSave() {

    if(localStorage.length === 0) {
       systemMessage("No game data found")
       screenShake()
       return
    }

    let q_row = document.querySelectorAll('th')
    q_row.forEach(function(cell) {
       for(let i = 0; i < localStorage.length; i++) {
            if(cell.id == localStorage.key(i)) {
                if(cell.className == 'headers') {
                    return
                } else {
                    cell.style.pointerEvents = 'none'
                    cell.innerHTML = '-'
                }
            }
       }
    })

    if(localStorage.getItem('doublePointToggled') == "true") {
        _dom.doublePointsSwitch.setAttribute("name", "radio-button-on-outline")
        document.querySelector('body').style.border = "green solid 2px"
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
    }

    if(localStorage.getItem('doubleTimeCheatEnabled') == "true") {
        _dom.doubleTimeSwitch.setAttribute("name", "radio-button-on-outline")
        _dom.doubleTimeCheatEnabled = true
        document.querySelector('body').style.border = "yellow solid 2px"
            
        _dom.questionLength = 12000
    }

    if(localStorage.getItem('editModeToggled') == "true") {
        _dom.editModeSwitch.setAttribute("name", "radio-button-on-outline")
        for (i = 0; i < player_headers.length; i++) {
            player_headers[i].className = "headers headers-edit"
        }
        _dom.editModeToggled = true
        document.querySelector('body').style.border = "red solid 2px"
    }

    if (localStorage.getItem('player4_score') != null) {
        addSavedPlayer(localStorage.getItem('player4_name'), localStorage.getItem('player4_score'))
    }

    if (localStorage.getItem('player5_score') != null) {
        addSavedPlayer(localStorage.getItem('player5_name'), localStorage.getItem('player5_score'))
    }

    if (localStorage.getItem('player6_score') != null) {
        addSavedPlayer(localStorage.getItem('player6_name'), localStorage.getItem('player6_score'))
    }

    if (localStorage.getItem('player7_score') != null) {
        addSavedPlayer(localStorage.getItem('player7_name'), localStorage.getItem('player7_score'))
    }

    if (localStorage.getItem('audioMuted') == "true" ) {
        _dom.mute_button.style.display = "none"
        _dom.unmute_button.style.display = "block"

        _dom.countdown_music.muted = true
        _dom.countdown_music.pause()
        _dom.countdown_music.currentTime = 0

        _dom.times_up.muted = true
        _dom.times_up.pause()
        _dom.times_up.currentTime = 0
    }

    for(let i = 0; i < player_names_table.children.length; i++) {
        document.getElementById(player_names_table.children[i].id).innerText = localStorage.getItem(player_names_table.children[i].id)
    }

    for(let i = 0; i < player_score_text.children.length; i++ ) {
        document.getElementById(player_score_text.children[i].id).innerText = localStorage.getItem(player_score_text.children[i].id)
    }

    _dom.p1_score = localStorage.getItem('player1_score')
    _dom.p2_score = localStorage.getItem('player2_score')
    _dom.p3_score = localStorage.getItem('player3_score')
    _dom.p4_score = localStorage.getItem('player4_score')
    _dom.p5_score = localStorage.getItem('player5_score')
    _dom.p6_score = localStorage.getItem('player6_score')
    _dom.p7_score = localStorage.getItem('player7_score')

     _dom.loadedGame = true

    systemMessage("Loaded Save")
    closeMenu()
}

function deleteLocalStorage() {
    if(localStorage.length === 0) {
        systemMessage("No game data found")
        screenShake()
        return
     }
    let checkpoint = confirm("Delete saved game?")
        if(checkpoint != false) {
            localStorage.clear()
            systemMessage("Deleted saved games")
            window.location.reload()
        } else {
            return
        }   
}

function checkQuestion(question, points) {
    if(question.children[i].innerHTML != '-') {
        question.children[i].innerHTML = points
    }
}
