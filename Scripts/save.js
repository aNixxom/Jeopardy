let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let popup = document.getElementById('popup')

import { closeMenu } from '/Scripts/game_settings.js'

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
    
    popup.innerHTML = "Game saved"
    popup.className = "show"
    setTimeout(function(){popup.className = popup.className.replace("show", "") }, 3000)
    
}

function loadSave() {
    document.getElementById('player1_name').innerText = localStorage.getItem('player1_name')
    document.getElementById('player2_name').innerText = localStorage.getItem('player2_name')
    document.getElementById('player2_name').innerText = localStorage.getItem('player2_name')

    document.getElementById('player1_score').innerText = localStorage.getItem('player1_score')
    document.getElementById('player2_score').innerText = localStorage.getItem('player2_score')
    document.getElementById('player3_score').innerText = localStorage.getItem('player3_score')

    popup.innerHTML = "Loaded Game"
    popup.className = "show"
    setTimeout(function(){popup.className = popup.className.replace("show", "") }, 3000)
    closeMenu()
}

function deleteLocalStorage() {
    confirm("Delete saved game?")
    localStorage.clear()
}

