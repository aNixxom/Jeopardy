import { closeMenu } from '/Scripts/game_settings.js'
import { systemMessage, screenShake, addSavedPlayer} from '/Scripts/createNewPlayers.js'
import {_dom, _rows} from '/Scripts/game_variables.js'
import {_pVars} from '/Scripts/game_variables.js'
import { _themes } from '/Scripts/game_variables.js'
import { changeTheme } from '/Scripts/game_theme_change.js'

let loadButton = document.getElementById('load')
let saveButton = document.getElementById('save')
let deleteButton = document.getElementById('delete')
let player_names_table = document.getElementById('player_names')
let player_score_text = document.getElementById('player_score_text')
let player_headers = document.getElementsByClassName('headers'), i;
let cells = document.querySelectorAll('.boxes')

saveButton.addEventListener('click', saveGame)
loadButton.addEventListener('click', loadSave)
deleteButton.addEventListener('click', deleteLocalStorage)

setTimeout(function() {
    if(localStorage.length != 0) {
        let loadRecentSave = confirm("Load recent save?")
        if(loadRecentSave == true) {
            loadSave()
        }
    }
}, 100)

function saveGame() {
    localStorage.clear()
    for(let i = 0; i < player_names_table.children.length; i++) {
        localStorage.setItem(player_names_table.children[i].id, player_names_table.children[i].innerHTML)
    }

    for(let i = 0; i < player_score_text.children.length; i++) {
        localStorage.setItem(player_score_text.children[i].id, player_score_text.children[i].innerHTML)
    }

    let used_questions = document.querySelectorAll("[data-used='true']")
    for(let i = 0; i < used_questions.length; i++) {
        if(used_questions[i].hasAttribute('data-used')) {
            let question_id = used_questions[i].id
            let attribute = used_questions[i].getAttribute('data-used')
            localStorage.setItem(question_id, attribute)
        }
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

    localStorage.setItem('questionLength', _dom.questionLength)   
    localStorage.setItem('theme', _themes[_dom.current_stylesheet])
    localStorage.setItem('currentStyleSheet', _dom.current_stylesheet)
    
    systemMessage("Game saved")
}

function loadSave() {
    
    if(localStorage.length === 0) {
       systemMessage("No saved game found")
       screenShake()
       return
    }
    
    _dom.questionLength = localStorage.getItem('questionLength')
    _dom.question_length_text.innerHTML = ` ${_dom.questionLength / 1000}s `
    _dom.question_length_icon.innerHTML = ` ${_dom.questionLength / 1000}s `

    let rows = document.querySelectorAll('td')
    rows.forEach(function(cell) {
       for(let i = 0; i < localStorage.length; i++) {
            if(cell.id == localStorage.key(i)) {
                cell.innerHTML = "-"
                cell.setAttribute('data-used', 'true')
            }
       }
    })

    if(localStorage.getItem('doublePointToggled') == "true") {
        _dom.doublePointsSwitch.setAttribute("name", "radio-button-on-outline")
        fetch('./questions.json')
        .then((response) => response.json())
        .then((info) => {
            cells.forEach((element, index) => {
                if(element.innerHTML != "-") {
                    element.childNodes[0].textContent = info['questions'][index].bonusValue
                }
            })
        })

        _dom.default_point_value = 400
        _dom.doublePointToggled = true
        _dom.double_points_icon.style.display = "block"
    }


    if(localStorage.getItem('editModeToggled') == "true") {
        _dom.editModeSwitch.setAttribute("name", "radio-button-on-outline")
        for (i = 0; i < player_headers.length; i++) {
            player_headers[i].className = "headers headers-edit"
        }
        _dom.editModeToggled = true
        _dom.edit_mode_icon.style.display = "block"
    }

    for(let i=4; i < 8; i++) {
        if(localStorage.getItem(`player${i}_score`) != null) {
            addSavedPlayer(localStorage.getItem(`player${i}_name`), localStorage.getItem(`player${i}_score`))
        }
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

    for(let i=0; i < 7; i++) {
        _dom[`p${i + 1}_score`] = localStorage.getItem(`player${i + 1}_score`)
    }

    changeTheme(localStorage.getItem('theme'))
    _dom.current_theme.innerText = ` ${localStorage.getItem('theme')} `

    _dom.loadedGame = true

    systemMessage("Loaded Save")
    closeMenu()
}

function deleteLocalStorage() {
    if(localStorage.length === 0) {
        systemMessage("No game data found")
        //screenShake()
        return
     }
    let confirmDelete = confirm("Delete saved game? This will remove all player data, the currently selected theme, reset the game board and revert all settings.")
        if(confirmDelete != false) {
            localStorage.clear()
            systemMessage("Deleted saved games")
            window.location.reload()
        } else {
            return
        }   
}


