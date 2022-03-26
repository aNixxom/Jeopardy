let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let popup = document.getElementById('popup')

import { closeMenu } from '/Scripts/game_settings.js'
import { systemMessage, screenShake} from '/Scripts/createNewPlayers.js'
import {_dom} from '/Scripts/game_variables.js'

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)
deleteButton.addEventListener('click', deleteLocalStorage)



function saveGame() {

    localStorage.setItem('player1_name', document.getElementById('player1_name').innerText)
    localStorage.setItem('player2_name', document.getElementById('player2_name').innerText)
    localStorage.setItem('player3_name', document.getElementById('player3_name').innerText)

    localStorage.setItem('player1_score', document.getElementById('player1_score').innerText)
    localStorage.setItem('player2_score', document.getElementById('player2_score').innerText)
    localStorage.setItem('player3_score', document.getElementById('player3_score').innerText)

    
    systemMessage("Game saved")
    
}

function loadSave() {
    if(localStorage.length === 0) {
       systemMessage("No game data found")
       screenShake()
       return
    }
    document.getElementById('player1_name').innerText = localStorage.getItem('player1_name')
    document.getElementById('player2_name').innerText = localStorage.getItem('player2_name')
    document.getElementById('player3_name').innerText = localStorage.getItem('player3_name')

    document.getElementById('player1_score').innerText = parseInt(localStorage.getItem('player1_score'))
    document.getElementById('player2_score').innerText = parseInt(localStorage.getItem('player2_score'))
    document.getElementById('player3_score').innerText = parseInt(localStorage.getItem('player3_score'))

    _dom.p1_score = localStorage.getItem('player1_score')
    _dom.p2_score = localStorage.getItem('player2_score')
    _dom.p3_score = localStorage.getItem('player3_score')

    _dom.loadedGame = true
    console.log(_dom.loadedGame)

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

