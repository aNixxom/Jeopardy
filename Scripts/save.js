let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let names = document.getElementById('player_names')

import { newPlayerNames } from '/Scripts/edit_player_name.js'
for(let i=0; i < names.children.length; i++) {
    console.log(names.children.item(i).innerHTML)
}  

function saveGame() {
    if(typeof(Storage) !== "undefined") {
        for(let i=0; i < newPlayerNames.length; i++) {
            localStorage.setItem(i, names.children.item(i).innerHTML)
            console.log(localStorage.getItem(i))
        }
    } else {
        console.log("Error") // do nothing
    }
}

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)

function loadSave() {
    if(typeof(Storage) !== "undefined") {
        
    } else {
        console.log('Hello')
    }
}

