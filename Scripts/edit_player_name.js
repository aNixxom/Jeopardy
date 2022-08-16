import { hideEditMenu, removeInputMenu, showEditMenu } from '/Scripts/custom_context_menu.js'
import { player_name_list } from '/Scripts/createNewPlayers.js'
import { _dom } from '/Scripts/game_variables.js'



let editButton = document.getElementById('edit-context-menu') // Gets 'edit-context-menu' from DOM 
let inputMenu = document.getElementById('input-menu')
let cancelButton = document.getElementById('cancel-context-menu') // Gets 'cancel-context-menu' from DOM

let clicked = null // Pre-defined variable to hold the id of clicked player

let newPlayerNames = [
    
]

window.addEventListener('contextmenu', editMenu);
editButton.addEventListener('click', createInputMenu);
inputMenu.addEventListener('keyup', userPressEnter);
cancelButton.addEventListener('click', clickCancelButton);

function editMenu(e) {
    if(_dom.editModeToggled == true) {
        for(let i = 0; i < player_name_list.length; i++) {
            if(e.target.id == player_name_list[i]) {
                clicked = e.target.id // Set to id of clicked player
                e.preventDefault()
                showEditMenu()
            }
        }
    }
}

function createInputMenu(e) {
    //console.log(e.target.id) //used fpr debug
    const input_menu_container = document.getElementById('imc')
    let input_menu = document.createElement('input')
    input_menu.setAttribute('id', "name-input")
    input_menu.setAttribute('class', "name-input")
    input_menu.setAttribute('type', "text")
    input_menu.setAttribute('maxlength', "10")
    input_menu.setAttribute('autocomplete', "false")
    input_menu.setAttribute('autofocus', "true")

    inputMenu.style.display = "block"
    input_menu_container.appendChild(input_menu)

    editButton.removeEventListener('click', createInputMenu)
}

function clickCancelButton() {
    hideEditMenu()
    editButton.addEventListener('click', createInputMenu)
    removeInputMenu()
}


function userPressEnter(input) {
    //console.log(clicked) //used for debug
    if(input.key === 'Enter') {
        let inputMenuValue = document.getElementById('name-input')
        if(inputMenuValue.value.length == 0) {
            alert("This  field cannot be empty")
        } else {
           for(let i = 0; i < player_name_list.length; i++) {
               if(clicked == player_name_list[i]) { // If clicked id is real then change code
                    document.getElementById(clicked).innerText = inputMenuValue.value
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
