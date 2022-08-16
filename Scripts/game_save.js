let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let popup = document.getElementById('popup')
let player_names_table = document.getElementById('player_names')
let player_score_text = document.getElementById('player_score_text')
let main_table = document.getElementById('main-table')
let every_class = document.querySelectorAll('*[class]')

import { closeMenu } from '/Scripts/game_settings.js'
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
    if(every_class[i].className.includes('used')) {
        let question_id = every_class[i].id
        let question_class = every_class[i].className.slice(-4)
        localStorage.setItem(question_id, question_class)
        
    }
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
                cell.style.pointerEvents = 'none'
                cell.innerHTML = '-'
            }
       }
    })

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
