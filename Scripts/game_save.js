let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let popup = document.getElementById('popup')
let player_names_table = document.getElementById('player_names')
let player_score_text = document.getElementById('player_score_text')

import { closeMenu } from '/Scripts/game_settings.js'
import { systemMessage, screenShake} from '/Scripts/createNewPlayers.js'
import {_dom} from '/Scripts/game_variables.js'

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
    let player_names_table = document.getElementById('player_names')
    let player_score_text = document.getElementById('player_score_text')

    for(let i = 0; i < player_names_table.children.length; i++) {
        localStorage.setItem(player_names_table.children[i].id, player_names_table.children[i].innerHTML)
    }

    for(let i = 0; i < player_score_text.children.length; i++) {
        localStorage.setItem(player_score_text.children[i].id, player_score_text.children[i].innerHTML)
    }

    localStorage.setItem('player_count', document.getElementById('player_count'))
    systemMessage("Game saved")
}

function loadSave() {
    let player_names_table = document.getElementById('player_names')
    let player_score_text = document.getElementById('player_score_text')

    document.getElementById('player_count').innerText = document.children.length

    if(localStorage.length === 0) {
       systemMessage("No game data found")
       screenShake()
       return
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
    confirm("Delete saved game?")
    localStorage.clear()
    systemMessage("Deleted saved games")
}
