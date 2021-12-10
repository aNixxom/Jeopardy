let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let popup = document.getElementById('popup')
let names = document.getElementById('player_names')

import { newPlayerNames } from '/Scripts/edit_player_name.js'
import { closeMenu } from '/Scripts/game_settings.js'

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)

function saveGame() {
    if(typeof(Storage) !== "undefined") {
        for(let i=0; i < newPlayerNames.length; i++) {
            localStorage.setItem(i, names.children.item(i).innerHTML)
            console.log(localStorage.getItem(i))
        }
        popup.innerHTML = "Game saved"
        popup.className = "show"
        setTimeout(function(){popup.className = popup.className.replace("show", "") }, 3000)
    } else {
        return
    }
}

function loadSave() {
    if(typeof(Storage) !== "undefined") {
        for(let j=0; j < names.children.length; j++) {
            names.children.item(j).innerHTML = localStorage.getItem(j)
        }
        popup.innerHTML = "Loaded Game"
        popup.className = "show"
        setTimeout(function(){popup.className = popup.className.replace("show", "") }, 3000)
        closeMenu()
    } else {
        return 
    }
}

