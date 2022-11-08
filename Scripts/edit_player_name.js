import { hideEditMenu, removeInputMenu, showEditMenu } from '/Scripts/custom_context_menu.js'
import { player_name_list,  systemMessage } from '/Scripts/createNewPlayers.js'
import { _dom } from '/Scripts/game_variables.js'

let editButton = document.getElementById('edit-context-menu') // Gets 'edit-context-menu' from DOM 
let inputMenu = document.getElementById('input-menu')
let cancelButton = document.getElementById('cancel-context-menu')
let resetPlayerNameButton = document.getElementById('reset-player-name')

let validId = null // Pre-defined variable to hold the id of clicked player
let customContextMenuOpen = false // Default false

let newPlayerNames = [
    
]

window.addEventListener('contextmenu', editMenu);
editButton.addEventListener('click', createInputMenu);
inputMenu.addEventListener('keyup', userPressEnter);
cancelButton.addEventListener('click', clickCancelButton);
resetPlayerNameButton.addEventListener('click', resetPlayerName)


function editMenu(event) {
    if(_dom.editModeToggled == true) {
        for(let i = 0; i < player_name_list.length; i++) {
            let targetId = event.target.id
            if(targetId == player_name_list[i]) {
                validId = event.target.id 
                console.log(validId)
                event.preventDefault() // prevent default context menu 
                showEditMenu()
                return
            } else {
                hideEditMenu()
            }
        }
    }
}

function createInputMenu() {
    const input_menu_container = document.getElementById('imc')
    let input_menu = document.createElement('input')
    input_menu.setAttribute('id', "name-input")
    input_menu.setAttribute('class', "name-input")
    input_menu.setAttribute('type', "text")
    input_menu.setAttribute('maxlength', "10")
    input_menu.setAttribute('autocomplete', "false")
    input_menu.setAttribute('autofocus', true)

    inputMenu.style.display = "block"
    input_menu_container.appendChild(input_menu)

    editButton.removeEventListener('click', createInputMenu)
    hideEditMenu()
}

function clickCancelButton() {
    hideEditMenu()
    editButton.addEventListener('click', createInputMenu)
    removeInputMenu()
}


function resetPlayerName() {
    let playernumber = validId.toString()
    document.getElementById(validId).innerText = `Player ${playernumber.charAt(6)}`
    hideEditMenu()
}

function userPressEnter(input) {
    if(input.key === 'Enter') {
        let inputMenuValue = document.getElementById('name-input')
        if(inputMenuValue.value.length == 0) {
            alert("This  field cannot be empty")
        } else {
           for(let i = 0; i < player_name_list.length; i++) {
               if(validId == player_name_list[i]) {
                    document.getElementById(validId).innerText = inputMenuValue.value
                    newPlayerNames.push(inputMenuValue.value)
                    console.log(newPlayerNames)
               }
           }
        }
        removeInputMenu()
        hideEditMenu()
        clickCancelButton()
    }
}

export { newPlayerNames }
