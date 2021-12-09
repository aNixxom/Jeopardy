let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let names = document.getElementById('player_names')

import { newPlayerNames } from '/Scripts/edit_player_name.js'

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)

function saveGame() {
    if(typeof(Storage) !== "undefined") {
        for(let i=0; i < newPlayerNames.length; i++) {
            localStorage.setItem(i, names.children.item(i).innerHTML)
            console.log(localStorage.getItem(i))
        }
    } else {
        return
    }
}

function loadSave() {
    if(typeof(Storage) !== "undefined") {
        for(let j=0; j < names.children.length; j++) {
            names.children.item(j).innerHTML = localStorage.getItem(j)
        }
    } else {
        return 
    }
}

